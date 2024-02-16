function minSonicMeets(arr, targetIndex) {
    // first basic condition to check - 
    // there should be only red, green, and blue Sonics in the forest (three items in an array exactly)
    if (targetIndex < 0 || targetIndex >= arr.length || arr.length !== 3) {
        return -1;
    };

    let nonZeroSonic = 0; // will count how many Sonic groups are desolate
    
    // second condition - each Sonics group can't be negative or more than the max possible integer
    let min = Number.MAX_VALUE;
    let max = -1;

    for (let i = 0; i < arr.length; i++) {
        // third basic condition - 
        // all Sonics were counted (got their numbers in the array)
        if (typeof arr[i] !== 'number') {
            return -1;
        };

        if (arr[i] > 0) {
            nonZeroSonic++
        }; // find how many colors are set 
    };
    
    arr.splice(targetIndex, 1); // exclude the target color from the array

    switch(targetIndex) {
        case 0:
            targetIndex = 'red';
            break;
        case 1:
            targetIndex = 'green';
            break;
        default:
            targetIndex = 'blue';
    }

    // now find the smaller and bigger Sonic group for later use
    min = Math.min(min, arr[0], arr[1]);
    max = Math.max(max, arr[0], arr[1]);

    // now check if the two groups of Sonics are able to plan meetings - 
    // their difference should be divisible by three without a remainder
    if (((max - min) % 3 === 0) && nonZeroSonic > 1) {
        return {
            meetingsNum: max,
            color: targetIndex,
        }
    } else {
        return -1;
    }
}

/*
// test our array manually, iteration by iteration
function minSonicMeetsManualTest(arr) {
    function iterateThroughSonics(red, green, blue, round) {
        let meeting = 0;
        let newArr = [...arr];
        console.log(`This is iteration round number ${round} with array: [${newArr.join(', ')}]`);
        
        while (true) {
            // some two groups lose members and another third group gets two new members
            newArr[red]--;
            newArr[green]--;
            newArr[blue] += 2;
            meeting++;
            console.log(`Meeting number ${meeting}: [${newArr.join(', ')}]`);

            // Check for zeros - if some group of Sonics is empty
            if (newArr[red] < 1 || newArr[green] < 1 || newArr[blue] < 1) {
                console.log("Error: A number has become zero.");
                return -1;
            }

            // If any groups become equal, adjust the indices for the next iteration scheme
            if (newArr[red] === newArr[green] || newArr[red] === newArr[blue] || newArr[green] === newArr[blue]) {
                console.log(`Equal groups found at the meeting number ${meeting} with array: [${newArr.join(', ')}]`);
                break;
            }
        }

        // Determine which two groups are equal for the adjusted iteration scheme
        let equalSonics = [];
        let otheSonic;
        if (newArr[red] === newArr[green]) {
            equalSonics = [red, green];
            otheSonic = blue;
        } else if (newArr[red] === newArr[blue]) {
            equalSonics = [red, blue];
            otheSonic = green;
        } else if (newArr[green] === newArr[blue]) {
            equalSonics = [green, blue];
            otheSonic = red;
        }

        // Continue with the adjusted iteration scheme
        while (newArr[equalSonics[0]] > 0 && newArr[equalSonics[1]] > 0) {
            newArr[equalSonics[0]]--;
            newArr[equalSonics[1]]--;
            newArr[otheSonic] += 2;
            meeting++;
            console.log(`Continued meeting ${meeting}: [${newArr.join(', ')}]`);

            if (newArr[equalSonics[0]] <= 0 && newArr[equalSonics[1]] <= 0) {
                console.log(`Final meeting was ${meeting} with array: [${newArr.join(', ')}]`);
                break;
            }
        }

        return meeting;
    }

    // Trying all permutations with detailed logging
    let results = [];
    results.push(`Number of meetings at the first round is ${iterateThroughSonics(0, 1, 2, 1)}`);
    results.push(`Number of meetings at the second round is ${iterateThroughSonics(0, 2, 1, 2)}`);
    results.push(`Number of meetings at the third round is ${iterateThroughSonics(1, 2, 0, 3)}`);

    return results.join('; ');
}
*/

let arr = [11, 5, 2];
let sonics = minSonicMeets(arr, 2);
console.log(`The minimum number of meetings needed to make all Sonics ${sonics.color} is: ${sonics.meetingsNum}`);
//console.log(minSonicMeetsManualTest(arr));