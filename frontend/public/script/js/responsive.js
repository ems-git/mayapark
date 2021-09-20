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

function testWidth(screenWidth)
{
    if (screenWidth > 1024)
    {
        console.log("pc resize",widthDevice);
        isComputer();
    }
    else if (screenWidth > 480) 
    {
        console.log("tablette resize",widthDevice);
        isTablet();
    }
    else
    {
        console.log("phone resize",widthDevice);
        isPhone();
    }
}

if (widthDevice > 1024) {
    
    console.log("Computer", widthDevice);
    isComputer();
    testWidth(Math.round(window.innerWidth));

    window.addEventListener('resize', function () {
        screenWidth = Math.round(window.innerWidth);
        testWidth(screenWidth);
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

