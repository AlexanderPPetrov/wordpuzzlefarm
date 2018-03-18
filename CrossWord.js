import {Toast} from "native-base";
import I18n from './i18n/i18n';
import fetch from 'react-native-fetch-polyfill';

let wordsArray = ["hello", "world", "madbid", "interesting", "task", "korea", "programming"],
    bestGrids = [],
    lettersGrid = [],
    lettersHashMap = {},
    usedWordsHash = {},
    wordsInGridData = {}
    wordsData = {},
    bestGridScore = 0,
    generateNextGridCount = 0,
    startWordX = 0,
    startWordY = 0,
    startTimeGrid = 0,
    startTimeTotal = 0,

    INITIAL_DIRECTION = 'HORIZONTAL',
    BOX_SIZE = 41,
    TIME_PER_GRID = 5000,
    TIME_TOTAL = 15000;

let CrossWord = {

    reset: () => {
        wordsArray = [];
        bestGrids = [];
        lettersGrid = [];
        lettersHashMap = {};
        usedWordsHash = {};
        wordsInGridData = {};
        wordsData = {};
        bestGridScore = 0;
        generateNextGridCount = 0;
        startWordX = 0;
        startWordY = 0;
        startTimeGrid = 0;
        startTimeTotal = 0;
    },

    calculateWords: () => {
        wordsArray.sort(function (a, b) {
            return b.length - a.length;
        });

        lettersHashMap = CrossWord.getLettersHashMap(wordsArray);
        wordsData = CrossWord.getCommonWordsHashMap(lettersHashMap, wordsArray);
        CrossWord.excludeNotCommonWords(wordsData);
        lettersGrid = CrossWord.defineLettersGrid(wordsArray);
        return CrossWord.startWordsCalculation(wordsArray);
    },
    startWordsCalculation: words => {
        startTimeTotal = new Date().getTime();
        for (var i = 0; i < words.length; i++) {
            wordsData[words[i]].x = startWordX;
            wordsData[words[i]].y = startWordY;
            wordsData[words[i]].direction = INITIAL_DIRECTION;
            CrossWord.generateGridStartingFromWord(words[i], wordsData[words[i]]);
        }

        //console.log(bestGrids[0])
        return ({
            grid: bestGrids[0],
            wordsInGridData
        });

    },
    getLettersHashMap: words => {
        var lettersHash = {};

        for (var i = 0; i < words.length; i++) {
            for (var j = 0; j < words[i].length; j++) {

                if (!lettersHash[words[i][j]]) {
                    lettersHash[words[i][j]] = [];
                }

                if (lettersHash[words[i][j]].indexOf(words[i]) == -1) {
                    lettersHash[words[i][j]].push(words[i])
                }
            }
        }

        return lettersHash;
    },
    getCommonWordsHashMap: (lettersHash, words) => {
        var wordsData = {};

        for (var i = 0; i < words.length; i++) {
            wordsData[words[i]] = {};
            if (!wordsData[words[i]].candidates) {
                wordsData[words[i]].candidates = [];
            }
            for (var j = 0; j < words[i].length; j++) {

                for (var k = 0; k < lettersHash[words[i][j]].length; k++) {
                    if (wordsData[words[i]].candidates.indexOf(lettersHash[words[i][j]][k]) == -1 && words[i] != lettersHash[words[i][j]][k]) {
                        wordsData[words[i]].candidates.push(lettersHash[words[i][j]][k])

                    }
                }
            }
        }

        return wordsData;
    },
    excludeNotCommonWords: wordsData => {
        for (var key in wordsData) {

            if (wordsData[key].candidates.length == 0) {
                var index = wordsArray.indexOf(key);
                wordsArray.splice(index, 1);
                for (var j = 0; j < key.length; j++) {
                    delete lettersHashMap[key[j]];
                }
                delete wordsData[key];
            }
        }
    },
    defineLettersGrid: words => {
        var lettersGrid = [],
            index = Math.ceil(words.length / 2),
            maxSize = 0;
        for (var i = 0; i < index; i++) {
            maxSize += words[i].length - 1;
        }

        startWordX = startWordY = maxSize;

        maxSize = maxSize * 3;

        for (var j = 0; j < maxSize; j++) {
            var xArray = [];
            lettersGrid.push(xArray);

            for (var k = 0; k < maxSize; k++) {
                lettersGrid[j].push('');
            }
        }
        return lettersGrid;
    },
    placeWordInGrid: (word, wordData, grid) => {

        wordsData[word] = wordData;
        if (wordData.direction == "HORIZONTAL") {
            for (var i = 0; i < word.length; i++) {
                grid[wordData.y][wordData.x + i] = word.charAt(i);
            }
        } else {
            for (var i = 0; i < word.length; i++) {
                grid[wordData.y + i][wordData.x] = word.charAt(i);
            }
        }
        usedWordsHash[word] = true;
    },
    removeWordFromGrid: (word, wordObject, grid) => {

        var currentY = wordObject.y;
        var currentX = wordObject.x;
        for (var i = 0; i < word.length; i++) {

            if (CrossWord.isPositionAvailable(currentY, currentX, wordObject.direction, grid)) {
                grid[currentY][currentX] = '';
            }

            if (wordObject.direction == 'HORIZONTAL') {
                currentX += 1;
            } else {
                currentY += 1;
            }
        }
        usedWordsHash[word] = false;
    },
    keepGridIfBetter: (grid, gridWordsSize, candidateWord, candidateWordData) => {


        if (gridWordsSize >= bestGridScore) {

            var newGrid = grid.map(function (arr) {
                return arr.slice();
            });

            if (gridWordsSize > bestGridScore) {
                bestGrids = [];
            }

            bestGridScore = gridWordsSize;

            if(candidateWord){
                wordsInGridData[candidateWord] = {
                    x: candidateWordData.x,
                    y: candidateWordData.y,
                    direction: candidateWordData.direction
                }

            }
            bestGrids.push(newGrid)

        }


    },
    isPositionAvailable: (y, x, direction, grid) => {

        if (direction == 'HORIZONTAL') {
            if (y - 1 > 0 && grid[y - 1][x] != '')
                return false;
            if (y + 1 < grid.length && grid[y + 1][x] != '')
                return false;
        } else {
            if (x - 1 > 0 && grid[y][x - 1] != '')
                return false;
            if (x + 1 < grid[0].length && grid[y][x + 1] != '')
                return false;
        }
        return true;
    },
    generateGridStartingFromWord: (word, wordData) => {

        var wordScore = CrossWord.calculateCandidateScore(word, wordData, -1, -1);

        if (wordScore >= 0) {

            startTimeGrid = new Date().getTime();
            CrossWord.placeWordInGrid(word, wordData, lettersGrid);
            CrossWord.keepGridIfBetter(lettersGrid, 1, word, wordData);

            var wordsLeft = wordsArray.length - 1;
            var wordsUsed = 1;
            CrossWord.generateNextGrid(word, wordData, wordsLeft, wordsUsed);

            CrossWord.removeWordFromGrid(word, wordData, lettersGrid);
        }

    },
    generateNextGrid: (previousWord, previousWordData, wordsLeft, wordsUsed) => {

        generateNextGridCount++;

        if (bestGridScore == wordsArray.length) return;
        var exceeds = CrossWord.shouldTerminate(wordsLeft, wordsUsed);
        if (exceeds) {
            return
        }


        var candidateDirection = 'HORIZONTAL';
        if (previousWordData.direction == 'HORIZONTAL') {
            candidateDirection = 'VERTICAL';
        }

        for (var i = 0; i < previousWordData.candidates.length; i++) {

            var candidateWord = previousWordData.candidates[i];

            if (!usedWordsHash[candidateWord]) {

                for (var j = 0; j < previousWord.length; j++) {

                    var crossLetter = previousWord.charAt(j);
                    if (lettersHashMap[crossLetter].indexOf(candidateWord) != -1) {


                        var crossingY = previousWordData.y,
                            crossingX = previousWordData.x + j;

                        if (previousWordData.direction == 'VERTICAL') {

                            crossingY = previousWordData.y + j;
                            crossingX = previousWordData.x;

                        }

                        for (var k = 0; k < candidateWord.length; k++) { //find where is this letter in the second word.
                            var candidateCrossLetter = candidateWord.charAt(k);

                            if (crossLetter == candidateCrossLetter) {
                                var candidateY = previousWordData.y + j;
                                var candidateX = previousWordData.x - k;

                                if (candidateDirection == 'VERTICAL') {
                                    candidateY = previousWordData.y - k;
                                    candidateX = previousWordData.x + j;
                                }
                                var candidateWordData = wordsData[candidateWord];
                                candidateWordData.y = candidateY;
                                candidateWordData.x = candidateX;
                                candidateWordData.direction = candidateDirection;

                                var candidateBoardScore = CrossWord.calculateCandidateScore(candidateWord, candidateWordData, crossingX, crossingY);
                                if (candidateBoardScore >= 0) { //the candidate is good, so let's place it and explore the option further

                                    CrossWord.placeWordInGrid(candidateWord, candidateWordData, lettersGrid);

                                    var newWordsUsed = wordsUsed + 1;
                                    var newWordsLeft = wordsLeft - 1;
                                    CrossWord.keepGridIfBetter(lettersGrid, newWordsUsed, candidateWord, candidateWordData);

                                    if (bestGridScore == wordsArray.length) return;

                                    for (var i = 0; i < wordsArray.length; i++) {
                                        if (usedWordsHash[wordsArray[i]]) {
                                            CrossWord.generateNextGrid(wordsArray[i], wordsData[wordsArray[i]], newWordsLeft, newWordsUsed);
                                        }
                                    }
                                    CrossWord.removeWordFromGrid(candidateWord, candidateWordData, lettersGrid);


                                }

                            }
                        }
                    }

                }
            }
        }
    },
    calculateCandidateScore: (word, wordData, intersectionX, intersectionY) => {

        var candidateScore = 0;
        var currentLetter = '',
            target = '';

        if (wordData.direction == 'HORIZONTAL') {
            //check whether the element before first letter and element after last letter are free. Words should not touch others
            if (lettersGrid[wordData.y][wordData.x + word.length] != '') return -1;
            if (lettersGrid[wordData.y][wordData.x - 1] != '') return -1;


            for (var i = 0; i < word.length; i++) {
                if (wordData.x + i == intersectionX) continue;
                currentLetter = word.charAt(i);
                target = lettersGrid[wordData.y][wordData.x + i];

                if (target == '') { //empty, so good candidate if it has valid neighbours

                    if (!CrossWord.isPositionAvailable(wordData.y, wordData.x + i, wordData.direction, lettersGrid)) return -1;
                } else if (target != word.charAt(i)) {
                    return -1;//letter is not matching
                } else {
                    //word is crossing another word, increase score
                    //console.log('---->', word, wordData, intersectionX, intersectionY)
                    candidateScore++;
                }
            }

        } else { //wordData.direction == 'VERTICAL'
            //check whether the element before first letter and element after last letter are free. Words should not touch others
            if (lettersGrid[wordData.y + word.length][wordData.x] != '') return -1;
            if (lettersGrid[wordData.y - 1][wordData.x] != '') return -1;


            for (var i = 0; i < word.length; i++) {
                if (wordData.y + i == intersectionY) continue;
                currentLetter = word.charAt(i);
                target = lettersGrid[wordData.y + i][wordData.x];

                if (target == '') { //empty, so good candidate if it has valid neighbours
                    if (!CrossWord.isPositionAvailable(wordData.y + i, wordData.x, wordData.direction, lettersGrid)) return -1;
                } else if (target != currentLetter) {
                    return -1;//letter is not matching
                } else {// target == current
                    //word is crossing another word, increase score
                    candidateScore++;
                }

            }
        }

        return candidateScore;
    },
    shouldTerminate: (wordsLeft, wordsUsed) => {
        var currentTime = new Date().getTime();
        //console.log(currentTime)
        if (currentTime - startTimeGrid >= TIME_PER_GRID) {
            return true; //kill execution if time limit is reached
        }

        if (currentTime - startTimeTotal >= TIME_TOTAL) {
            return true;
        }
        //
        //bottom of recursion
        if (wordsLeft == 0) {
            return true;
        }
        //we will not find a better solution down this path
        if (wordsLeft + wordsUsed <= bestGridScore) {
            return true;
        }
        //this is a global maximum so stop searching for better solutions (here better means with more words, not with more crossings)
        if (bestGridScore == wordsArray.length) {
            return true;
        }

        return false;
    },
    generate: (words = wordsArray) => {
        wordsArray = words;
        return CrossWord.calculateWords()
    },



}

export default CrossWord;
