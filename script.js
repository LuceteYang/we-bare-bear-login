(function(){
var pandaBear = `<svg id="bear" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,150 C0,65 120,65 120,150" fill="#fff" stroke="#000" stroke-width="2.5" />
        <g class="ears">
            <path d="M44,32 L44,30 C44,16 24,16 24,30 L24,32" fill="#676461" stroke="#000" stroke-width="2.5" stroke-linecap="round" transform="rotate(-10,38,24)" />
            <path d="M75,32 L75,30 C75,16 95,16 95,30 L95,32" fill="#676461" stroke="#000" stroke-width="2.5" stroke-linecap="round" transform="rotate(10,82,24)" />
        </g>
        <ellipse cx="60" cy="95" rx="50" ry="80" style="fill:#fff;" stroke="#000" stroke-width="2.5"/>
        <g class="eyes">
            <!-- left eye and eyebrow-->
            <!-- <circle cx="44" cy="55" r="8" fill="#676461" /> -->
            <rect x="33" y="45" rx="7" ry="7" width="20" height="20"style="fill:#676461;" />
            <circle cx="44" cy="55" r="2" fill="#000" />
            
            <!-- right eye and eyebrow -->
            <!-- <circle cx="76" cy="55" r="8" fill="#676461" /> -->
            <rect x="67" y="45" rx="7" ry="7" width="20" height="20"style="fill:#676461;" />
            <circle cx="76" cy="55" r="2" fill="#000" />
        </g>
        <g class="muzzle">
            <ellipse cx="60" cy="65" rx="10" ry="4" style="fill:black;"/>
            <path d="M56,80 C58.5,82.5 61,82.5 63.5,80"  stroke="black" stroke-width="2"  fill="none"/>
        </g>
        <path d="M7,100 C58.5,120 61,120 112,100"  stroke="#565353" stroke-width="20"  fill="none"/>
    </svg>`
var brownBear = `<svg id="bear" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" >
        <path d="M0,150 C0,65 120,65 120,150" fill="#A56F49" stroke="#000" stroke-width="2.5" />
        <g class="ears">
            <path d="M44,32 L44,30 C44,16 24,16 24,30 L24,32" fill="#A56F49" stroke="#000" stroke-width="2.5" stroke-linecap="round" transform="rotate(-10,38,24)" />
            <path d="M75,32 L75,30 C75,16 95,16 95,30 L95,32" fill="#A56F49" stroke="#000" stroke-width="2.5" stroke-linecap="round" transform="rotate(10,82,24)" />
        </g>
        <ellipse cx="60" cy="95" rx="50" ry="80" style="fill:#A56F49;" stroke="#000" stroke-width="2.5"/>
        <g class="eyes">
            <!-- left eye and eyebrow-->
            <circle cx="44" cy="55" r="2" fill="#000" />
            <!-- right eye and eyebrow -->
            <circle cx="76" cy="55" r="2" fill="#000" />
        </g>
        <g class="muzzle">
            <ellipse cx="60" cy="65" rx="10" ry="4" style="fill:black;"/>
            <path d="M56,80 C58.5,82.5 61,82.5 63.5,80"  stroke="black" stroke-width="2"  fill="none"/>
        </g>
    </svg>`
var whiteBear = `<svg id="bear" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,150 C0,65 120,65 120,150" fill="#fff" stroke="#000" stroke-width="2.5" />
        <g class="ears">
            <path d="M44,32 L44,30 C44,16 24,16 24,30 L24,32" fill="#fff" stroke="#000" stroke-width="2.5" stroke-linecap="round" transform="rotate(-10,38,24)" />
            <path d="M75,32 L75,30 C75,16 95,16 95,30 L95,32" fill="#fff" stroke="#000" stroke-width="2.5" stroke-linecap="round" transform="rotate(10,82,24)" />
        </g>
        <ellipse cx="60" cy="95" rx="50" ry="80" style="fill:#fff;" stroke="#000" stroke-width="2.5"/>
        <g class="eyes">
            <!-- left eye and eyebrow-->
            <circle cx="44" cy="55" r="2" fill="#000" />
            <!-- right eye and eyebrow -->
            <circle cx="76" cy="55" r="2" fill="#000" />
        </g>
        <g class="muzzle">
            <ellipse cx="60" cy="65" rx="10" ry="4" style="fill:black;"/>
            <path d="M56,80 C58.5,82.5 61,82.5 63.5,80"  stroke="black" stroke-width="2"  fill="none"/>
        </g>
    </svg>`
var baearArr = [pandaBear,brownBear,whiteBear];
document.getElementById("content").innerHTML = baearArr[Math.floor(Math.random() * 3)];
const bear = document.querySelector('#bear');
const face = document.querySelectorAll('.ears, .eyes, .muzzle');
const email = document.querySelector('input[type="text"]');
const password = document.querySelector('input[type="password"]');
const fauxInput = document.createElement('div');
const span = document.createElement('span');
let timer = null;

function rotate3d(x, y, z, rad) {
    const value = `rotate3d(${x}, ${y}, ${z}, ${rad}rad)`;
    for (let i=0; i < face.length; i++) {
        face[i].style.transform = value;
    }
}

function focus(event) {
    event.target.classList.add('focused');
    copyStyles(event.target);
    event.target.type === 'password' ? lookAway(event) : look(event);
}

function reset(event) {
    event.target.classList.remove('focused');
    bear.classList.remove('playing');

    clearTimeout(timer);
    timer = setTimeout( () => {
        bear.classList.remove('look-away', 'down', 'up');
        rotate3d(0,0,0,0);
    }, 1 );
}

function copyStyles(el) {
    const props = window.getComputedStyle(el, null);

    if ( fauxInput.parentNode === document.body ) {
        document.body.removeChild(fauxInput);
    }

    fauxInput.style.visibility = 'hidden';
    fauxInput.style.position = 'absolute';
    fauxInput.style.top = Math.min(el.offsetHeight * -2, -999) + 'px';

    for(let i=0; i < props.length; i++) {
        if (['visibility','display','opacity','position','top','left','right','bottom'].indexOf(props[i]) !== -1) {
            continue;
        }
        fauxInput.style[props[i]] = props.getPropertyValue(props[i]);
    }

    document.body.appendChild(fauxInput);
}

function look(event) {
    const el = event.target;
    const text = el.value.substr(0, el.selectionStart);

    span.innerText = text || '.';

    const bearRect = bear.getBoundingClientRect();
    const inputRect = el.getBoundingClientRect();
    const caretRect = span.getBoundingClientRect();
    const caretPos = caretRect.left + Math.min(caretRect.width, inputRect.width) * !!text;
    const distCaret = bearRect.left + bearRect.width/2 - inputRect.left - caretPos;
    const distInput = bearRect.top + bearRect.height/2 - inputRect.top;
    const y = Math.atan2(-distCaret, Math.abs(distInput)*3);
    const x =  Math.atan2(distInput, Math.abs(distInput)*3 / Math.cos(y));
    const angle = Math.max(Math.abs(x), Math.abs(y));

    rotate3d(x/angle, y/angle, y/angle/2, angle);
}

function lookAway(event) {
    const el = event.target;
    const bearRect = bear.getBoundingClientRect();
    const inputRect = el.getBoundingClientRect();
    const distInput = bearRect.top + bearRect.height/2 - inputRect.top;

    bear.classList.add( 'look-away', distInput < 0 ? 'up' : 'down' );

    clearTimeout(timer);
    timer = setTimeout( () => {
        bear.classList.add( 'playing' );
    }, 300);
}

fauxInput.appendChild(span);

email.addEventListener( 'focus', focus, false );
email.addEventListener( 'keyup', look, false );
email.addEventListener( 'click', look, false );
email.addEventListener( 'blur', reset, false );

password.addEventListener( 'focus', lookAway, false );
password.addEventListener( 'blur', reset, false );

})();