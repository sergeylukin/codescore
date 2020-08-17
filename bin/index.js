#!/usr/bin/env node

const yargs = require("yargs");
const exec = require('child_process').execSync;
const resolve = require('path').resolve
const fs = require('fs')

const options = yargs
  .usage("Usage: count -p <path to project> -g '<group name> <dir regex> <file regex>' -g '<group name> <dir regex> <file regex>'")
  .command("count", "Count lines of code in different parts of projects by groups")
  .option("p", { alias: "path", descript: "Path to repo", type: "string", demandOption: true})
  .check((argv) => {
    if (fs.existsSync(argv.path)) {
       return true;
    }
    throw new Error('Argument check failed: -p or --path should be a valid path');
  })
  .option("g", { alias: "group", describe: "Groups", type: "array", demandOption: true })
 .argv;

const path = resolve(options.path)

var results = []

options.group.forEach(function(groupStr) {
  groupStr.replace("\\\\", "\\")

  const parts = groupStr.split(' ')
  const name = parts[0]
  const match_d = parts[1]
  const match_f = parts[2]

  const result = exec(`cloc --csv --match-f="${match_f}" --match-d="${match_d}" ${path}`, { encoding: 'utf8' }).toString()
  const totalLOC = parseInt(result.split(',').pop(), 10)
  results.push({
    name: name,
    count: totalLOC
  })
})

console.log(results)
