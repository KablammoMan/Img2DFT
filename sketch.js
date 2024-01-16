let test = []
const circle_rad_mod = 1; // Scales the drawing
let ready = false;
let reset;
let sub;
let inp;
let inp_head;
let pos = [];
let dftTest = [];
let img = null;
let angleOffset = 0;
function setup() {
    inp = createFileInput(handleImage, false);
    sub = createButton("Submit");
    reset = createButton("Stop");
    inp_head = select("p", "#input");
    inp.attribute("accept", "image/*");
    inp.attribute("class", "form-control mb-3");
    inp.parent("input");
    sub.attribute("class", "btn btn-warning w-100");
    sub.mousePressed(() => {
        ready = true;
        reset.show();
        dftTest = dftc(test);
        dftTest.sort((a,b) => b.amp-a.amp);
    });
    sub.hide();
    sub.parent("input");
    reset.attribute("class", "btn btn-danger w-100");
    reset.mousePressed(() => {
        test = [];
        pos = [];
        dftTest = [];
        ready = false;
        inp_head.html("Upload an Image", false);
        img = null;
        angleOffset = 0;
        reset.hide();
    });
    reset.hide();
    reset.parent("input")
    createCanvas(windowWidth, 800);
}
function draw() {
    resizeCanvas(windowWidth, 800);
    if (img && !ready) {
        inp_head.html("Draw an Outline", false);
        imageMode(CENTER);
        let scalex = width/img.width;
        let scaley = height/img.height;
        let scale = min(scalex, scaley);
        image(img, width/2, height/2, img.width * scale, img.height * scale);
        inp.hide();
        sub.show();
    }
    let LEN = test.length;
    if (ready) {
        inp_head.html("Watch as Circles Redraw the Outline", false)
        strokeWeight(3)
        sub.hide();
        background(127);
        let finX = width/2;
        let finY = height/2;
        translate(finX,finY)
        finX = finY = 0
        let newPos = [];
        for (let i = 0; i < LEN; i++) {
            let circ = dftTest[i];
            let amp = circ.amp * circle_rad_mod
            let omega = circ.ang + angleOffset * circ.frq
            newPos = [amp * cos(omega), amp * sin(omega)]; // -amp => +y is up rather than down
            finX += newPos[0];
            finY += newPos[1];
            noFill();
            stroke(255)
            ellipse(0, 0, 2 * amp)
            stroke(0,255,255)
            line(0, 0, newPos[0], newPos[1])
            translate(newPos[0], newPos[1])
        }
        pos.unshift([finX, finY]);
        translate(-finX, -finY);
        stroke(0);
        beginShape();
        for (let i = 0; i < pos.length; i++) {
            vertex(pos[i][0], pos[i][1]);
        }
        endShape();
        angleOffset += 2 * PI / LEN
    } else {
        inp.show();
        strokeWeight(10)
        if (mouseIsPressed && img) {
            test.push([mouseX-width/2, mouseY-height/2])
        }
        if (frameCount % 10 == 0) {
            stroke(random(0, 255))
        }
        for (let pnti = 0; pnti < test.length; pnti++) {
            if (pnti == 0) {
                line(width/2 + test[test.length-1][0], height/2 + test[test.length-1][1], width/2 + test[pnti][0], height/2 + test[pnti][1])
            } else {
                line(width/2 + test[pnti-1][0], height/2 + test[pnti-1][1], width/2 + test[pnti][0], height/2 + test[pnti][1])
            }
        }
    }
}
// Discrete Fourier Transform for Complex Numbers (For Drawing Images)
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
// Discrete Fourier Transform for Real Numbers ONLY (For Drawing Waves)
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
function handleImage(file) {
    if (file.type != "image") {
        return alert("Submit an image to outline!")
    }
    test = []
    img = createImg(file.data)
    img.hide()
}