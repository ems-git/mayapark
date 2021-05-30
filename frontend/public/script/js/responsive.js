const widthDevice = window.screen.width;

let cssComputer = document.querySelector("#cssComputer");
let cssTablet = document.querySelector("#cssTablet");
let cssPhone = document.querySelector("#cssPhone");

function isPhone()
{
    cssComputer.disabled = true;
    cssTablet.disabled = true;
    cssPhone.disabled = false;
}
function isTablet()
{
    cssComputer.disabled = true;
    cssTablet.disabled = false;
    cssPhone.disabled = true;
}
function isComputer()
{
    cssComputer.disabled = false;
    cssTablet.disabled = true;
    cssPhone.disabled = true;
}

if (widthDevice > 1024) {
    
    console.log("Computer", widthDevice);
    isComputer();

    window.addEventListener('resize', function () {
        screenWidth = Math.round(window.innerWidth);
        if (screenWidth > 1024) isComputer();
        else if (screenWidth > 480) isTablet()
        else isPhone()
    });
}
else if (widthDevice>480)
{
    console.log("Tablet",widthDevice);
    isTablet()
}
else
{
    console.log("Phone",widthDevice);
    isPhone()
}

