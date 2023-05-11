const { Schema, model } = require('mongoose');
const Doubt = require("./doubtModel.js");
const Answer = require("./answerModel.js");

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, select: false },
  doubts: [{ type: Schema.Types.ObjectId, ref: 'Doubt' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
}, { timestamps: true });


userSchema.pre('save', function (next) {
  // ENCRYPT PASSWORD 
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (_, hash) => {
      user.password = hash;
      next();
    });
  });
});

// Need to use function to enable this.password to work.
userSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = model('User', userSchema);