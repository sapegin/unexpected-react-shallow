
var Diff = require('./diff');
var Equality = require('./equality');
var Search = require('./search');

exports.addAssertionsTo = function (expect) {

    expect.addAssertion('ReactElement', 'to have [exactly] rendered', function (expect, subject, renderOutput) {

        var exactly = this.flags.exactly;

        expect.withError(function () {
            return Equality.assertElementsMatch(subject, renderOutput, expect, {
                exactly: exactly
            });
        }, function (e) {
            return expect.fail({
                diff : function (output, diff, inspect, equal) {
                    return Diff.diffElements(subject, renderOutput, output, diff, inspect, equal, {
                        exactly: exactly
                    });
                }
            });
        });
    });

    expect.addAssertion('ReactElement', 'to contain', function (expect, subject, expected) {

        if (!Search.findElementIn(subject, expected, expect, {
                exactly: false
            })) {
            expect.fail();
        }
    });

    expect.addAssertion('ReactElement', 'to contain exactly', function (expect, subject, expected) {

        if (!Search.findElementIn(subject, expected, expect, {
                exactly: true
            })) {
            expect.fail();
        }
    });

    expect.addAssertion('ReactElement', 'to satisfy', function (expect, subject, expected) {

        return expect(subject, 'to have rendered', expected);
    });

    expect.addAssertion('ReactShallowRenderer', 'to have [exactly] rendered', function (expect, subject, renderOutput) {

        var actual = subject.getRenderOutput();
        return expect(actual, 'to have ' + (this.flags.exactly ? 'exactly ' : '') + 'rendered', renderOutput);
    });

    expect.addAssertion('ReactShallowRenderer', 'to contain', function (expect, subject, expected) {

        var actual = subject.getRenderOutput();
        return expect(actual, 'to contain', expected);
    });

    expect.addAssertion('ReactShallowRenderer', 'to contain exactly', function (expect, subject, expected) {

        var actual = subject.getRenderOutput();
        return expect(actual, 'to contain exactly', expected);
    });

};