"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var ts = require('typescript');
var Lint = require('tslint/lib/lint');

var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ImportSlimObservableOnlyWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'You need use import \'Observable\' from \'rxjs/Observable\' instead of from \'rxjs/Rx\'';
    return Rule;
}(Lint.Rules.AbstractRule));

exports.Rule = Rule;

var ImportSlimObservableOnlyWalker = (function (_super) {
    __extends(ImportSlimObservableOnlyWalker, _super);
    function ImportSlimObservableOnlyWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.scanner = ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, sourceFile.text);
    }
    ImportSlimObservableOnlyWalker.prototype.visitImportDeclaration = function (node) {
        var importClause = node.importClause;

        if (importClause != null && importClause.parent != null) {
            var text = importClause.parent.moduleSpecifier.text;
            if (this.checkForBigJsForm(text)) {
                this.addFailure(this.createFailure(importClause.namedBindings.getStart(), importClause.namedBindings.getWidth(), Rule.FAILURE_STRING));
            }
        }
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    ImportSlimObservableOnlyWalker.prototype.checkForBigJsForm = function (text) {
        return /rxjs\/Rx/.test(text);
    };
    return ImportSlimObservableOnlyWalker;
}(Lint.SkippableTokenAwareRuleWalker));
