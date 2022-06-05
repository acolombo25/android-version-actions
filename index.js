const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
const versionCodeRegexPattern = /(versionCode(?:\s|=)*)(.*)/;
// versionName — A string used as the version number shown to users [...] -> https://developer.android.com/studio/publish/versioning
const versionNameRegexPattern = /(versionName(?:\s|=)*)(.*)/;

try {
    const gradlePath = core.getInput('gradlePath');
    const versionCode = core.getInput('versionCode');
    const versionName = core.getInput('versionName');
    const versionCodeSuffix = core.getInput('versionCodeSuffix');
    const versionNameSuffix = core.getInput('versionNameSuffix');
    console.log(`Gradle Path : ${gradlePath}`);
    console.log(`Version Code : ${versionCode}`);
    console.log(`Version Name : ${versionName}`);
    console.log(`Version Code Suffix : ${versionCodeSuffix}`);
    console.log(`Version Name Suffix : ${versionNameSuffix}`);

    fs.readFile(gradlePath, 'utf8', function (err, data) {
        newGradle = data;
        if (versionCode.length > 0)
            newGradle = newGradle.replace(versionCodeRegexPattern, `$1${versionCode}`);
        if (versionCodeSuffix.length > 0)
            newGradle = newGradle.replace(versionCodeRegexPattern, `$1$2${versionCodeSuffix}`);
        if (versionName.length > 0)
            newGradle = newGradle.replace(versionNameRegexPattern, `$1\"${versionName}\"`);
        if (versionNameSuffix.length > 0)
            newGradle = newGradle.replace(versionNameRegexPattern, `$1\"$2${versionNameSuffix}`);
        fs.writeFile(gradlePath, newGradle, function (err) {
            if (err) throw err;
            if (versionCode.length > 0)
                console.log(`Successfully override version code ${versionCode}${versionCode}`);
            if (versionCodeSuffix.length > 0)
                console.log(`Successfully added version code suffix ${versionCode}`);
            if (versionName.length > 0)
                console.log(`Successfully override version code ${versionName}${versionName}`);
            if (versionNameSuffix.length > 0)
                console.log(`Successfully added version name suffix ${versionName;
            core.setOutput("result", `Done`);
        });
    });

} catch (error) {
    core.setFailed(error.message);
}
