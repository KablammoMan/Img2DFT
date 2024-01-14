const test = []
const circle_rad_mod = 2;
let pos = [];
let dftTest;
let angleOffset = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 100; i++) {
        test.push([i, i * noise(i)])
    }
    dftTest = dftc(test);
    dftTest.sort((a, b) => b.amp - a.amp)
}
function draw() {
    let LEN = test.length;
    if (!mouseIsPressed) {
        resizeCanvas(windowWidth, windowHeight);
        background(200);
        let finX = finY = min(windowWidth, windowHeight)/2
        translate(finX,finY)
        finX = finY = 0
        beginShape(LINES);
        noFill();
        stroke(0)
        for (let i = 0; i < pos.length; i++) {
            vertex(pos[i][0], pos[i][1], 8)
        }
        endShape();
        let newPos = [];
        for (let i = 0; i < LEN; i++) {
            let circ = dftTest[i];
            let amp = circ.amp * circle_rad_mod
            let omega = circ.ang + angleOffset * circ.frq
            newPos = [amp * cos(omega), -amp * sin(omega)];
            finX += newPos[0];
            finY += newPos[1];
            noFill();
            stroke(0, 50)
            ellipse(0, 0, 2 * amp)
            stroke(0, 100)
            line(0, 0, newPos[0], newPos[1])
            ellipse(newPos[0], newPos[1], 8)
            translate(newPos[0], newPos[1])
        }
        pos.unshift([finX, finY]);
        // if (pos.length > 500) {
        //     pos.pop()
        // }
        angleOffset += 2 * PI / LEN
        // if (angleOffset > 2 * PI) {
        //     pos = []
        //     angleOffset = 0
        // }
    }
}
// Discrete Fourier Transform for Complex Numbers
// x is in form [[Re(x0), Im(x0)], [Re(x1), Im(x1)], ...]
function dftc(x){
    let N = x.length;
    let X = [];
    for (let k = 0; k < N; k++) {
        let rel = 0;
        let img = 0;
        for (let n = 0; n < N; n++) {
            let sigma = 2 * PI * (k / N) * n;
            rel += x[n][0] * cos(sigma) - x[n][1] * -sin(sigma);
            img += x[n][0] * -sin(sigma) + x[n][1] * cos(sigma);
        }
        rel /= N;
        img /= N;
        let amp = sqrt(rel ** 2 + img ** 2);
        let frq = k;
        let ang = atan2(img, rel)
        X.push({rel, img, amp, frq, ang})
    }
    return X;
}
// Discrete Fourier Transform for Real Numbers ONLY
function dftr(x){
    let N = x.length;
    let X = [];
    for (let k = 0; k < N; k++) {
        let rel = 0;
        let img = 0;
        for (let n = 0; n < N; n++) {
            let sigma = 2 * PI * (k / N) * n;
            rel += x[n] * cos(sigma);
            img += x[n] * -sin(sigma);
        }
        rel /= N;
        img /= N;
        let amp = sqrt(rel ** 2 + img ** 2);
        let frq = k;
        let ang = atan2(img, rel);
        X.push({rel, img, amp, frq, ang})
    }
    return X;
}