var fs = require('fs');
var path = require('path');
var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');
var chalk = require('chalk');
var { createObjectExpression, createArrayExpression } = require('./utils');

console.log(chalk.magenta('***********开始运行啦*******************'))

var newPageName = process.argv[2] ? process.argv[2] : 'TestPage';

var appRouterPath = path.resolve(__dirname, '../src/app/router.js')
var reductStorePath = path.resolve(__dirname, '../createStore.js')
var templatePagePath = path.resolve(__dirname, '../src/UserManage');
var newPagePath = path.resolve(__dirname, '../src', `./${newPageName}`);

// step1: 创建新目录
fs.mkdirSync(newPagePath)

// step2: 读取源文件
var files = fs.readdirSync(templatePagePath)

// step3: 拷贝源文件到目标文件
files.forEach((filename) => {
  var source = path.resolve(templatePagePath, './', filename);
  var target = path.resolve(newPagePath, './', filename);
  fs.copyFileSync(source, target)
})

console.log(chalk.greenBright('copy files success'))

// step4: 替换 NAMESPACE
const constantsFile = fs.readFileSync(path.resolve(newPagePath, './constants.js'));
const constantsAst = esprima.parseModule(constantsFile.toString())
estraverse.traverse(constantsAst, {
  enter: function (node, parent) {
    if (node.type == 'VariableDeclarator') {
      if (node.id && node.id.name === 'NAMESPACE') {
        node.init.value = newPageName;
        return estraverse.VisitorOption.Break;
      }
    }
  }
});
let constantsResult = escodegen.generate(constantsAst);
fs.writeFileSync(path.resolve(newPagePath, './constants.js'), constantsResult)

console.log(chalk.greenBright('NAMESPACE replace success'))

// step5: 在app/router.js 中注入路由
const routerFile = fs.readFileSync(appRouterPath);
const routerAst = esprima.parseModule(routerFile.toString())
estraverse.traverse(routerAst, {
  enter: function (node, parent) {
    if (node.type == 'ArrayExpression' && parent) {
      if (parent.id && parent.id.name === 'routerList') {
        let routerArray = node.elements;
        var newRoute = {key: newPageName, path: `/${newPageName}`}
        routerArray.push(createArrayExpression(JSON.stringify(newRoute)));
        return estraverse.VisitorOption.Break;
      }
    }
  }
});
let routerResult = escodegen.generate(routerAst);
fs.writeFileSync(appRouterPath, routerResult)

console.log(chalk.greenBright('insert router success'))

// step6: 在createStore.js 中注入reducer
const storeFile = fs.readFileSync(reductStorePath);
const storeAst = esprima.parseModule(storeFile.toString())
var importStr = 'import ' + newPageName + ' from '  + '"' + './src/' + newPageName + '/reducer' + '"';
var insertContent = esprima.parseModule(importStr);
let importCount = 0;
estraverse.traverse(storeAst, {
  enter: function (node, parent) {
    if (node.type === 'ImportDeclaration') {
      importCount++;
    }
    if (node.type !== 'ImportDeclaration' && parent && parent.body) {
      parent.body.splice(importCount, 0, insertContent);
      return estraverse.VisitorOption.Break;
    }
  }
});
estraverse.traverse(storeAst, {
  enter: function (node, parent) {
    if (node.type == 'ObjectExpression' && parent) {
      if (parent.id && parent.id.name === 'reducers') {;
        node.properties = node.properties.concat(createObjectExpression(JSON.stringify({[newPageName]: newPageName})))
        return estraverse.VisitorOption.Break;
      }
    }
  }
});
let storeResult = escodegen.generate(storeAst);
fs.writeFileSync(reductStorePath, storeResult)

console.log(chalk.greenBright('insert reducer success'))


