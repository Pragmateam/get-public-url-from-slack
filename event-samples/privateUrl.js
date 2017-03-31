const args = process.argv.slice(2);
const privateUrlFromCommandLine = args[args.length - 1];

module.exports = {
  "url": privateUrlFromCommandLine
};
