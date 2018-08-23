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
      // var json = {
      //   fileName: fileName,
      //   content: data.toString()
      // };
      var cipher = Crypto.createCipher("aes-256-cbc", this.password);
      let ext = ".fryp";
      if (this.encName) {
        fileName = new Buffer(fileName).toString("hex");
        ext = ".enc.fryp";
      }
      var encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

      fs.unlinkSync(this.filePath);
      fs.writeFileSync(path.join(loc, fileName + ext), encrypted);
      return { message: "Encrypted!" };
    } catch (exception) {
      throw new Error(exception.message);
    }
  }

  decrypt() {
    try {
      var data = fs.readFileSync(this.filePath);
      let loc = path.dirname(this.filePath);
      var fileName = path.basename(this.filePath).split(".");
      fileName.splice(-1, 1);
      fileName = fileName.join(".");
      var decipher = Crypto.createDecipher("aes-256-cbc", this.password);
      var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
      fs.unlinkSync(this.filePath);
      if (fileName.split(".").slice(-1)[0] == "enc") {
        fileName.split(".").splice(-1, 1);
        fileName = new Buffer(fileName, "hex").toString();
        console.log(fileName);
      }
      fs.writeFileSync(path.join(loc, fileName), decrypted);
    } catch (exception) {
      throw new Error(exception.message);
    }
  }
}
