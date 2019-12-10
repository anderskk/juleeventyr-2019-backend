
const taskCheckers = {
    getBiggestNumber: { taskFn: checkBiggestNumber, subLevel: 1 },
    getNumbers: { taskFn: checkGetNumbers, subLevel: 2 },
    removeDuplicates: { taskFn: checkRemoveDuplicates, subLevel: 3 },
    toRoeverspraak: { taskFn: checkToRoeverspraak, subLevel: 4 },
    swapPairs: { taskFn: checkSwapPairs, subLevel: 5 }
};

function checkAnswer(task, code) {
    const givenTask = taskCheckers[task];
    if (!givenTask) {
        throw new Error(`Oppgaven (${task}) finnes ikke!`)
    }
    const checkTaskFn = givenTask.taskFn;

    return checkTaskFn && checkTaskFn(code);
}

function subLevel(taskName) {
    return taskCheckers[taskName].subLevel;
}

function checkBiggestNumber(code) {
    const testInput = '[4, 555, 666, 666, 2, 7]';
    const expected = 666;

    try {
        const evalFn = `var myFunc = ${code}
            myFunc(${testInput});
        `;
        console.log('eval fn: ', JSON.stringify(evalFn));
        const result = eval(evalFn);

        const success = result === expected;
        console.log(`Task success: ${success}`)
        return success;
    } catch (e) {
        console.log('Failed task', e);
        return false;
    }
}

function checkGetNumbers(code) {
    const testInput = '\'dbdbib2n3g733n73gn3n329\'';
    const expected = [2, 3, 7, 3, 3, 7, 3, 3, 3, 2, 9];

    try {
        const evalFn = `var myFunc = ${code}
            myFunc(${testInput});
        `;
        console.log('eval fn: ', JSON.stringify(evalFn));
        const result = eval(evalFn);

        if (!expected.length === result.length) {
            console.log('Failed task without errors')
            return false;
        }

        for (let i = 0; i < result.length; ++i) {
            if (result[i] !== expected[i]) {
                console.log('Failed task without errors')
                return false;
            }
        }
        console.log('Task success!')
        return true;
    } catch (e) {
        console.log('Failed task', e);
        return false;
    }
}

function checkRemoveDuplicates(code) {
    const testInput = '[\'lols\', \'halla\', \'hallais\', \'lols\', \'halla\', \'hallais\']';
    const expected = ['lols', 'halla', 'hallais'];

    try {
        const evalFn = `var myFunc = ${code}
            myFunc(${testInput});
        `;
        console.log('eval fn: ', JSON.stringify(evalFn));
        const result = eval(evalFn);

        if (!expected.length === result.length) {
            console.log('Failed task without errors')
            return false;
        }

        for (let i = 0; i < result.length; ++i) {
            if (result[i] !== expected[i]) {
                console.log('Failed task without errors')
                return false;
            }
        }
        console.log('Task success!')
        return true;
    } catch (e) {
        console.log('Failed task', e);
        return false;
    }
}

function checkToRoeverspraak(code) {
    return check(code, 'bsgig swbgs gwb ui db', 'bobsosgogig swowbgs gwb ui dodb');
}

function checkSwapPairs(code) {
    return check(code, 'hei hei hhh', "eh ieh ihhh");
}

function check(code, testInput, expectedAnswer) {
    try {
        const result = eval(`var myFunc = ${code}
            myFunc('${testInput}');
        `);

        return result == expectedAnswer;
    } catch (e) {
        console.log('Failed task', e);
        return false;
    }
}

function randomString(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = { checkAnswer, subLevel };