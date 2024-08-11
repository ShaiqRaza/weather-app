// for different kind of window
function updateViewportHeight() {
    // Calculate 1% of the viewport height
    const vh = window.innerHeight * 0.01;
    // Set a custom property on the root element
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initial call
updateViewportHeight();
// Update on resize
window.addEventListener('resize', updateViewportHeight);


function setAllData(response){
    let date = new Date((response.dt) * 1000)
    weekDay.innerHTML = date.toLocaleString('en-US', { weekday: 'long' });
    month.innerHTML = date.toLocaleString('en-US', { month: 'long' });
    dayDate.innerHTML = date.toLocaleString('en-US', { day: 'numeric' });
    year.innerHTML = date.toLocaleString('en-US', { year: 'numeric' });
    city.innerHTML = response.name
    country.innerHTML = response.sys.country
    mainTemp.innerHTML = Math.round(response.main.temp)
    feelTemp.innerHTML = Math.round(response.main.feels_like)
    maxTemp.innerHTML = Math.round(response.main.temp_max)
    minTemp.innerHTML = Math.round(response.main.temp_min)
    sunrise.innerHTML = new Date((response.sys.sunrise) * 1000).toLocaleString('en-us', { hour: 'numeric', hour12: true, minute:'numeric' })
    sunset.innerHTML = new Date((response.sys.sunset) * 1000).toLocaleString('en-us', { hour: 'numeric', hour12: true, minute:'numeric' })
    weatherDescription.innerHTML = response.weather[0].main
    windSpeed.innerHTML = response.wind.speed
    humidity.innerHTML = response.main.humidity
    pressure.innerHTML = response.main.pressure
}

let timeLine = gsap.timeline();
let logoAnimationFlag = true

function searchContainerAndLogoAnimation(){
    if(logoAnimationFlag){
        timeLine.to(logo,{
            duration: 0.3,
            opacity: 0,
        })
        timeLine.to(searchContainer,{
            duration: 2,
            y: -(window.innerHeight*0.36),
            ease: "circ.out",
        })
        timeLine.to(logo,{
            duration: 0,
            y: -(window.innerHeight*0.36),
            ease: "circ.out",
        })
        timeLine.to(logo,{
            duration: 0.3,
            opacity: 100,
        })
        logoAnimationFlag = false
    }
}
function displayMainContentAnimation(){
    tempDisplay.style.display='block'
    timeLine.from( tempDisplay, {
        duration: 1,
        ease: "circ.out",
        opacity: 0,
        display: 'none',
    })
}
let searchFunction = async ()=>{
    if( searchInput.value )
        {
            let cityName = searchInput.value
            let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e32e4d863361d86cf2ed85cc9de80443&units=metric`
            let response = await fetch(weatherURL)
           
            if(response.status === 200){
                response = await response.json()
                setAllData(response)
                searchContainerAndLogoAnimation()
                displayMainContentAnimation()  
            }
            else{
                // will add some functionality of UI
            }
        }
    }
   
//typed location ko cut karne ke lie
cross.addEventListener('click', ()=>{
    searchInput.value = ''
    searchInput.focus()
})
searchInput.addEventListener('focus',()=>{
    if(searchInput.value)
        cross.innerHTML = 'x'
    else
        cross.innerHTML = ''
})
searchInput.addEventListener('keyup',(key)=>{ 
    //for enter press key
    if(key.keyCode === 13){
        searchButton.click()
        searchInput.blur()
    }
    else if(searchInput.value)
        cross.innerHTML = 'x'
    else
        cross.innerHTML = ''
})
searchInput.addEventListener('blur',()=>{
    cross.innerHTML = ''
})
searchButton.addEventListener('click', searchFunction)