function objectFromElement(element) {
    let object = {
        _name: element.localName,
        _children: []
    };
    Array.from(element.attributes).forEach(a => {
        object[a.name] = a.value;
    });
    Array.from(element.children).forEach(c => {
        object._children.push(objectFromElement(c));
    });
    if (element.childNodes.length && element.childNodes[0] instanceof CDATASection) {
        object._text = element.childNodes[0].data;
    }
    return object;
}

// replace test-suite contents with child test-suite contents, 
// if the suite only contains another suite
function collapsed(test) {
    if (test._name !== 'test-suite') {
        return test;
    }
    let childTests = test._children.filter(t => ['test-suite', 'test-case'].includes(t._name));
    if (childTests.length != 1 || childTests[0]._name != 'test-suite') {
        test._children = test._children.map(collapsed);
        return test;
    }
    let childSuite = collapsed(childTests[0]);
    test._children = childSuite._children;
    test.name += " / " + childSuite.name;
    return test;
}

function enrichWithAllResults(test) {
    let allResults = new Set()
    test._children.forEach(child => {
        if (child._name == 'test-case') {
            allResults.add(child.result);
        } else if (['test-run', 'test-suite'].includes(child._name)) {
            enrichWithAllResults(child);
            child.allResults?.forEach(r => allResults.add(r));
        }
    });
    test.allResults = Array.from(allResults);
}

export function testRunFromText(text) {
    let testRun = null;
    try {
        let domParser = new DOMParser();
        let doc = domParser.parseFromString(text, 'text/xml');
        testRun = objectFromElement(doc.documentElement);
        if (testRun._name !== 'test-run') {
            console.error(`Expected root XML element <test-run>, got ${testRun._name}`);
            return null;
        }
        // testRun._children = testRun._children.map(collapsed);
        enrichWithAllResults(testRun);
    } catch (e) {
        console.log(e);
    }
    return testRun;
}

export function findFirstChild(node, childElementName) {
    if (!node) return null;
    let elems = node._children.filter((c) => c._name == childElementName);
    return elems.length > 0 ? elems[0] : null;
}