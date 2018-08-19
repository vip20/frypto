const fs = require("fs");
const Crypto = require("crypto");
const path = require("path");

export class Safe {
  constructor(filePath, password, encName = false) {
    this.filePath = filePath;
    this.password = password;
    this.encName = encName;
  }

  encrypt() {
    try {
      var data = fs.readFileSync(this.filePath);
      var loc = path.dirname(this.filePath);
      var fileName = path.basename(this.filePath);
      var json = {
        fileName: fileName,
        content: data.toString()
      };
      fs.unlinkSync(this.filePath);
      var cipher = Crypto.createCipher("aes-256-cbc", this.password);
      if (this.encName) {
        fileName = Crypto.createHash("sha256")
          .update(fileName)
          .digest("hex");
      }
      var encrypted = Buffer.concat([
        cipher.update(new Buffer(JSON.stringify(json), "utf8")),
        cipher.final()
      ]);
      fs.writeFileSync(path.join(loc, fileName + ".fryp"), encrypted);
      return { message: "Encrypted!" };
    } catch (exception) {
      fs.writeFileSync(path.join(loc, json.fileName), data);
      throw new Error(exception.message);
    }
  }

  decrypt() {
    try {
      var data = fs.readFileSync(this.filePath);
      let loc = path.dirname(this.filePath);
      fs.unlinkSync(this.filePath);
      var decipher = Crypto.createDecipher("aes-256-cbc", this.password);
      var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
      let json = JSON.parse(decrypted.toString());
      var content = json.content;
      let fileName = json.fileName;
      fs.writeFileSync(path.join(loc, fileName), content);
    } catch (exception) {
      throw new Error(exception.message);
    }
  }
}
