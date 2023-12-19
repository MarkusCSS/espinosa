document.addEventListener('DOMContentLoaded', function () {
    const gridWrapper = document.querySelector('.grid-wrapper');
    const gridItems = gridWrapper.children;
    const gridGap = 10;
    let redDiv = null;
    function setCoverSat1(){
       document.querySelectorAll('img').forEach(e=>{
            e.style.objectFit='cover';
            e.style.filter='saturate(1)';
       });
    }
    function setCoverSat1Oposite(){
       document.querySelectorAll('img').forEach(e=>{
            e.style.objectFit='cover';
            e.style.filter='saturate(0)';
       });
    }

    function removeRedDiv() {
        if (redDiv) {
            gridWrapper.removeChild(redDiv);
            redDiv = null;
        }
    }

    function rearrangeGrid() {
        removeRedDiv();

        const width = gridWrapper.clientWidth;
        const itemWidth = gridItems[0].clientWidth;
        const columns = Math.floor(width / (itemWidth + gridGap));
        let totalRows = 0;

        for (let i = 0; i < gridItems.length; i++) {
            const currentColumn = i % columns;
            const newRow = Math.floor(i / columns);

            gridItems[i].style.gridColumn = `span ${gridItems[i].classList.contains('wide') ? 2 : 1}`;
            gridItems[i].style.gridRow = `span ${gridItems[i].classList.contains('tall') ? 2 : 1}`;

            if (currentColumn > 0) {
                gridItems[i].style.marginLeft = gridGap + 'px';
            }

            if (newRow > 0) {
                gridItems[i].style.marginTop = gridGap + 'px';
            }

            totalRows = Math.max(totalRows, newRow + 1);
        }

        const lastRowItems = gridItems.length % columns;
        const remainingSpace = columns - lastRowItems;
        const redDivHeight = gridItems[0].clientHeight + gridGap;
        const totalHeight = redDivHeight * Math.ceil(remainingSpace / columns);

        if (remainingSpace > 0 && totalRows > 0) {
            redDiv = document.createElement('div');
            redDiv.classList.add('red-space');
            redDiv.style.gridColumn = `span ${remainingSpace}`;
            redDiv.style.background = 'red';
            redDiv.style.height = `${totalHeight}px`;
            redDiv.style.justifySelf = 'stretch';
            gridWrapper.appendChild(redDiv);
        }
    }

    rearrangeGrid();

    window.addEventListener('resize', function () {
        removeRedDiv();
        rearrangeGrid();
    });

    function sliderBtn(x,element){
       
         let indexOfPicture = Array.from(gridItems).indexOf(element);
         
         let newIndex = indexOfPicture + x;
         newIndex = (newIndex + gridItems.length) % gridItems.length;
         console.log(indexOfPicture,newIndex);
         return gridItems[newIndex];

    }

    var body = document.body;
    var minmaxLimit = 0;
    

    function getBackgroundImage(element) {
        const style = element.currentStyle || window.getComputedStyle(element, false);
        return style.backgroundImage.slice(4, -1).replace(/['"]/g, "");
    }
   
   

    function setPictureIntoSliderPopUp() {
        Array.from(gridItems).forEach(element => {
            let popUpFrame = document.createElement('div');
            let popUpClose = document.createElement('div');
            let popUpBtnLeft = document.createElement('div');
            let popUpBtnRight = document.createElement('div');
            let signXtoClose = document.createElement('div');
            let signLeftToScroll = document.createElement('div');
            let signRightToScroll = document.createElement('div');
            


            popUpFrame.classList.add('popUpFrame', 'popUpImage');
            popUpClose.classList.add('popUpClose', 'popUpBtnClose');
            popUpBtnLeft.classList.add('popUpBtnLeft','popUpBtnLeft');
            popUpBtnRight.classList.add('popUpBtnRight','popUpBtnRight');
            signXtoClose.classList.add('signXtoClose','singnXtoClose');
            signLeftToScroll.classList.add('signLeftToScroll','signSidestoClose');
            signRightToScroll.classList.add('signRightToScroll','signSidestoClose');
            signXtoClose.innerHTML='&#10006;';
            signLeftToScroll.innerHTML='&lArr;';
            signRightToScroll.innerHTML='&rArr;';
            popUpClose.appendChild(signXtoClose);
            popUpBtnLeft.appendChild(signLeftToScroll);
            popUpBtnRight.appendChild(signRightToScroll);
            
            element.addEventListener('click', () => {
                const imageContainCss = element.querySelector('img');
                 console.log(element.querySelector('img'));
                 
                 
                         setCoverSat1Oposite();  
                        imageContainCss.style.filter='saturate(1)';
                        imageContainCss.style.objectFit='contain';
                    
                
                 
                 
                popUpFrame.innerHTML=``;
                const backgroundImage = getBackgroundImage(element);
                popUpFrame.style.cssText = `
                width: 100%;
                height:100%;
                border: 0px solid white;
                border-radius: 10px;
                position: fixed;
                z-index: 9999;
                top: 50%; /* Center vertically */
                left: 50%; /* Center horizontally */
                transform: translate(-50%, -50%); /* Center the element precisely */
                overflow: hidden;
                `;
                popUpFrame.innerHTML =element.innerHTML;
                popUpFrame.appendChild(popUpClose);
                popUpFrame.appendChild(popUpBtnLeft);
                popUpFrame.appendChild(popUpBtnRight);
                body.appendChild(popUpFrame);
                document.querySelector('.blurSlider').style.display='block';

                popUpClose.addEventListener('click',()=>{
                    setCoverSat1();
                    document.querySelector('.blurSlider').style.display='none';
                    popUpFrame.style.display='none';
                    minmaxLimit=0;
                });
                popUpBtnLeft.addEventListener('click',()=>{
                        console.log('Slide to left');
                       console.log(imageContainCss) 
                        minmaxLimit = (minmaxLimit - 1 + 40) % 40;
                          
                     setTimeout(()=>{  
                     let transfer =   sliderBtn(minmaxLimit,element);
                     setCoverSat1Oposite();
                     transfer.querySelector('img').style.objectFit ='contain';
                     transfer.querySelector('img').style.filter='saturate(1)';
                     let length = gridItems.length;
                     popUpFrame.innerHTML=transfer.innerHTML;
                     popUpFrame.appendChild(popUpClose);
                popUpFrame.appendChild(popUpBtnLeft);
                popUpFrame.appendChild(popUpBtnRight);
            },0);     
                     
                     
                      
                    
                });
                popUpBtnRight.addEventListener('click',()=>{
                    console.log('Slide to right');
                    minmaxLimit = (minmaxLimit + 1) % 40;
                        setTimeout(()=>{ 
                   let transfer= sliderBtn(minmaxLimit,element);
                   setCoverSat1Oposite();
                   transfer.querySelector('img').style.filter='saturate(1)';
                   transfer.querySelector('img').style.objectFit ='contain';
                   let length = gridItems.length;
                    popUpFrame.innerHTML=transfer.innerHTML;
                    popUpFrame.appendChild(popUpClose);
                popUpFrame.appendChild(popUpBtnLeft);
                popUpFrame.appendChild(popUpBtnRight);
            },0);
                   
                  
                });
            });
        });
    }

    setPictureIntoSliderPopUp();
});
