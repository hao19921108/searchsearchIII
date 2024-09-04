let searchInput = document.getElementsByClassName("search-input");
let input = document.getElementsByTagName('input');
let wrapper = document.getElementsByClassName("wrapper");
let hoverImg = document.getElementsByClassName("hoverImage");

let haoTxt ; // slogan

let button;
let fruitIndex = -1;
let secretCode=['Ruins are becoming...','请输入关键词，或奢侈品',"大家都在搜什么？","Ruins are...","奢侈品不是关键词","搜索一下","我需要奢侈品","成为废墟...关键词"]; // first phrase is the placeholder text;
const historyNumber = 13;
let inputBox = 0;
let closeBtn;
let pngAsset; // modal-body
let label;
let inputTxt;
let popWindow;
let searchHistroyArray=[];
let isTyping =0;
let myInterval=0;

let inputValue="";
let emptyInterval = 0;

let updatedInputValue; // altered user input

let clickTimeOut = 30000; // 30s 
let clickCountdown = clickTimeOut;


var cursor = document.createElement('img'); 


setTimeout(init,1000);


//var changeBlurryText = setInterval( hotRankTextUpdate , 60000);



function hotRankTextUpdate(){
    
    linksArray = document.getElementsByTagName('a');

  //  console.log(linksArray[3].href);
    
    for(var j=0; j<newsTitle.length; j++){
        
    linksArray[3+j].innerText = newsTitle[j];    
        
    }
}


function setImageVisible( domElement, visible){
    
    domElement.style.display = ( visible ? 'block':'none');
}


function init(){
    
    
    
    
    inputBox= input[0];
     createHistory();

    
    pngAsset = document.getElementsByClassName("modal-body")[0];
    closeBtn = document.getElementsByClassName("closeButton")[0];
    labelTxt = document.getElementsByClassName("label")[0];
    inputTxt = document.getElementsByClassName("userInput")[0];
    haoTxt =  document.getElementsByClassName("hao")[0];
    

    popWindow =  document.getElementsByClassName("modal-content")[0];
    inputBox.value = secretCode[0]; //placeholder
        
    popWindow.style.border="1px solid #555";
    
    pngAsset.addEventListener('click', e=>{
        setImageVisible(defaultAnswer,false);
        veggieSearch();
        
    })
    

    closeBtn.innerHTML = '<img id="cross" src="images/cross02.png" alt="closeButton" width="3%"/>';
    
    labelTxt.innerHTML='基于 2022-05-24 的搜索结果';
    
    
    defaultAnswer =  document.getElementsByClassName("modal-content")[0];
    
    button= document.getElementsByClassName("s-btn-b")[0];
    
 //   setImageVisible(closeBtn,false);
   setImageVisible(defaultAnswer,false);

    hideEmptyInputFieldBtn();
    
// Default Sugestions hide
    
    closeBtn.addEventListener('click', function(){
        
        console.log('fuck off default suggestions');
        setImageVisible(defaultAnswer,false);
        haoTxt.innerHTML='<p>请躺在吊床上，拿起电脑在输入框里搜索搜索... </p>'
        
         createHistory();

        if(inputBox.value.length<1){
            inputBox.value = secretCode[0]; //placeholder
            inputBox.style.color = 'lightgray';
            clearInterval(myInterval);
            
            myInterval = setInterval( updatePlaceholderTxt, 5000);

            
        }

        
    });
    
    
//
    
    
//  inputBox.style.border='1px solid black'
  // document.addEventListener("keydown",()=>{ isTyping=1; inputBox.focus(); clearInterval(my)  } );

    
    document.addEventListener('mousemove', (event) => {
//
    
        
    
    
});
    
    
    
    
    inputBox.addEventListener("click", function(){
        
        
        
        clickCountdown = clickTimeOut; // reset CLickTimeout

          haoTxt.innerHTML='<p>加载中...</p>'

          //hideShowSuggestions
         hideHoverImage();

          
        console.log('*** '+inputBox.value + ' ***');
        if(!inputBox.value){
            console.log('empty empty empty');
//            showSearchHistory();
        }
        
        // placeholder stored at secretCode 0;
        if( inputBox.value == secretCode[0] ){
            
            inputBox.value='';
            
            setImageVisible( defaultAnswer , true );
            showSearchHistory();
            
        }else{
            
            // suggested messages 
            
            if(inputBox.value.length>0){ displayEmptyInputFieldBtn();}else{hideEmptyInputFieldBtn();}

            
            setImageVisible( defaultAnswer , true );
            
            // match inputBox value with keywords; 
            if(inputBox.value){
                let emptyArray_02 =[];

                 emptyArray_02 = messages.filter((data)=>{
                 return data.toLocaleLowerCase().startsWith(inputBox.value.toLocaleLowerCase());
                 
             });
                
             showSuggestions(emptyArray_02); //  display matched results
                
            }else{
                 showSearchHistory(); // no user input would be searchhistory

            }
            
             inputTxt.innerHTML= inputBox.value;


        }
  
        
//        inputBox.value="This input field is sponsored by";
        
        inputBox.style.color ="#000"; // inputbox active color
        
//        emptyInterval = setInterval(removeText,1000);
        
    });
    
    inputBox.addEventListener("keydown", down);
//    inputBox.addEventListener("keyup", up);

     inputBox.addEventListener("keyup",function(e){
        
         inputBox.style.color ="#000"; // inputbox active color

          if( inputBox.value.length>0){hideHoverImage();}
         
         if(inputBox.value.length>0){ displayEmptyInputFieldBtn();}else{hideEmptyInputFieldBtn();}
         
         haoTxt.innerHTML='<p>加载中...</p>'
         
         
         
         
         let userData = e.target.value;
         let emptyArray =[];
         if(userData){
             
             emptyArray = messages.filter((data)=>{
                 return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                 
             });
             
             console.log(emptyArray);
             
         }
         
        // emptyArray is an array that collects auto suggestions
        // show suggestions
       
            showSuggestions(emptyArray); 
         

     });
    
}

function hideEmptyInputFieldBtn(){
    
        
        document.getElementsByClassName("clear")[0].innerHTML = '';
   
    
}

function displayEmptyInputFieldBtn(){
     document.getElementsByClassName("clear")[0].innerHTML ="<button class='clear' onclick='emptyInputField()'> <img src='images/cross02.png' width='22px'> </button>";

}

  function emptyInputField(){
    
      if(inputBox.value.length>0){ displayEmptyInputFieldBtn();}else{hideEmptyInputFieldBtn();}
 
      
      inputBox.value='';
    inputBox.focus(); 
      inputTxt.innerHTML='';
    
      
      showSearchHistory();

      
      
    }
    


function createHistory(){
    
    let n = Math.floor(Math.random() * suggestedResultsArray.length/2);
    
    for ( let i=0;i< historyNumber ;i++){
        searchHistroyArray[i] =  "<li onmouseout='hideHoverImage' onmousemove='displayHoverImage(event)' onmouseover='change("+ i +"," + n + ")'>" + fakeTitles[  Math.floor(Math.random() * fakeTitles.length) ]+ "</li>";
    }
    
   
}

function hideHoverImage(){
     setImageVisible( hoverImg[0], false);
}

function displayHoverImage(event){
    // display image according to mouse position
  
  //  haoTxt.innerHTML = localMousePos.x + ' , ' + localMousePos.y;
   
    
    
    
    let boundaryX = 1100;
    let localX = ( event.clientX < boundaryX ? event.clientX: boundaryX );
    
    
    hoverImg[0].style.left = localX + 2  + 'px';
    hoverImg[0].style.top = ( event.clientY - 100 ) + 'px';
    
}


function change( i , n ){

    let hoverImg = document.getElementsByClassName('hoverImage')[0];
    if( i+ n < suggestedResultsArray.length )
    { hoverImg.innerHTML = suggestedResultsArray[ i+ n ]}
    else{
   
        hoverImg.innerHTML = suggestedResultsArray[ i+ Math.floor(n/2) ]
    };
}

function showSearchHistory(){
    
    
    
    if ( hoverImg[0].style.display!='block'){  setImageVisible( hoverImg[0], true);}

    
    pngAsset.innerHTML='';
    
      for ( let i=0;i< historyNumber ;i++){
       pngAsset.innerHTML += searchHistroyArray[i];
    }
    
    console.log('history is loaded');
   
    
}



function showSuggestions(emptyArray){
    
    fruitIndex = getIndex( emptyArray[0] );
    
    // display matched results
           if ( emptyArray){
            setImageVisible( defaultAnswer , true );
            inputTxt.innerHTML= emptyArray[0];
            pngAsset.innerHTML = suggestedResultsArray[fruitIndex];
             
         }
    // no match results then display users input
    if(emptyArray.length===0 || emptyArray ===''){
         inputTxt.innerHTML = inputBox.value;
         haoTxt.innerHTML='<p>加载中...</p>'
           setImageVisible( defaultAnswer , true );
          pngAsset.innerHTML = banArray[  Math.floor(Math.random() * banArray.length )];
        
    }
    
    if(!inputBox.value){
             showSearchHistory();
         }
         
     
      
       
           
           
}


function showSuggestionsKeywords(keyWords){
    
    fruitIndex = getIndex( keyWords );
    
     pngAsset.innerHTML = suggestedResultsArray[fruitIndex];


}


function getIndex( keyWords){
    
  
         let a  = messages.indexOf( keyWords );
   if( a > suggestedResultsArray.length-1 ) 
        { a = a - suggestedResultsArray.length +5; }
    
    
    
    return a;
    
}





let threshold = 5000; 

let maxTimeOut = threshold; // every MaxTimeout to update input placeholder txt

let blinkDivide =3; // ? 

let currentInput ='';

let secretIndex=0;

function colorCheck(){
    
    return ;
    
    // click Alert if the user doesn't click the input field for 10seconds.
    // display secret code to get user's attention
    
    clickCountdown -= 500;
    if( clickCountdown<200){
        console.log('I need a dick');
        input[0].style.border='1px solid black';
        
               
        // something is gonna happen here. 
        currentInput = inputBox.value;// cureent   
        input[0].style.color="rgb(0, 0, 0)"; // cureent shit is black
        secretIndex = Math.floor(Math.random() * secretCode.length);
        
        if(secretIndex > blinkDivide  ){
             button.classList.add('back');

        }
        inputBox.value = secretCode[ secretIndex ];
        clickCountdown = clickTimeOut;
        
    }else{
        
        if(secretIndex < blinkDivide ){
            
            if(button.classList.contains('back')){
            button.classList.remove('back');}

        }else{
            
         
        if(  input[0].style.border=='1px solid black'){       
        if(button.classList.contains('back')){
            button.classList.remove('back');
            }else{ 
            button.classList.add('back');
            }
        } 
        
        }
    }
    
    // change words every 5 seconds.
    
    if(input[0] && input[0].style.color=="rgb(0, 0, 0)"){
        

     clearInterval(myInterval);
       maxTimeOut -= 500;
        
    }
    
    if(maxTimeOut<1){
        /*
        
        myInterval = setInterval( updatePlaceholderTxt, threshold *5 );
        input[0].style.border='1px solid lightgrey';
        
        // init state
        setImageVisible(defaultAnswer,false); // hide pop up window content
        haoTxt.innerHTML='<p>Without Errors on Results</p>'; // update slogan


        maxTimeOut = threshold * 5 ;    
        input[0].style.color="lightgray";
        updatePlaceholderTxt();
        */
        
       // window.location.reload();
        
    }
        
}

// let colorCheckSet = setInterval(colorCheck,500);
let reloadExperience = setInterval(reloadEverything,60000);

function reloadEverything(){
    window.location.reload();

}


function down(){    
     
    maxTimeOut = threshold; 
    
    if(  inputBox.value == secretCode[0] ){ inputBox.value='';}

    
   
    
    
    if(event.keyCode===13){
    
        setImageVisible(defaultAnswer,false); // hide pop up window content
        haoTxt.innerHTML='<p>Without Errors on Results</p>'; // update slogan

          
        console.log('submit input... waiting to be altered.');
        search();  
        
        
        
           
      //     wrapper[0].innerHTML='<img src="images/A.jpg" alt="Girl in a jacket" width="100%" height="auto">'
    //       console.log(  wrapper[0].innerHTML);
       }
    
    
    
    
    
}






function removeText(){
    
    var array=[];
    var lastLetter;
    var newArray=[];

    if(inputBox.value){     
    
        array = inputBox.value;
        lastLetter = array[array.length-1]; // last letter 
        newArray = array.substring(0,array.length-1);
        
        inputBox.value = newArray;
        
    }

}



if(!isTyping){
    if(!input[0]){ myInterval = setInterval( updatePlaceholderTxt, 5000);}
}

var messages=['Pipatchara','Disaya','Zadig & Voltaire','Urban Code','Wang Weiwei','Neil Barret','LV','Louis Vuitton','Burberry','Maserati',"Rolex","Ferrari","Cartier","Dior","Balenciaga","Omega","Gucci ","Lamborghini","Ray-ban","Benley","Rolls Royce",'SK-II','Balenciaga','Prada','Armani','Apple',"Banana's Republic","McLaren","Estee Lauder","Fendi","Sulwhasoo","Hermes",'A Cold Wall','ACW','Ermenegildo Zegna','Fred Perry','Helmut Lang','HOPE','Izzue','Issue','Lanvin','Paul Smith','Lacoste','LOW CLASSIC','NIKE JORDAN','Rick Owens','ROA','Solomon','On','Travis Scott','Paris Saint','Acne Studio','BEAMS','New Balance','Sacai','Ambush','Atmos',"IKEA","Kenzo","Longines","La Mer","Loro Piana","Tom Ford","Lancome","Jaeger-LeCoultre","Lululemon","Aston Martin","Porsche","Feng Chen Wang","Rolex","SSENSE","GOAT","Tiffany & Co","Moncler","Acne Studio",'LOEWE','YSL','Valentino',"Y3","Yeezy","Random Event","Tag Heuer","Bulgari","COACH 1941","Lancome",'Yohji Yamamoto','BAPE','Comme Des Garcons','Palace','Teddy Santis','Ronnie Fieg','Stussy',"CHANEL",'Fear Of God','Theory','Off-White','AMIRI','ADER ERROR','MAISON MARGIELA','Thom Browne','JACQUEMUS','AMI ALEXANDRE','MATTIUSSI','MCQ ALEXANDER MCQUEEN','ALEXANDER MCQUEEN','Alexander Wang','A.P.C','adidas Originals','Etro','Essentials','Balmain','Ralph Lauren Purple Label','Stone Island','44 Label Group','Anna Sui','Canada Goose','COTTON CITIZEN','Cote & Ciel',"Drake's",'Emporio Armani','Human Recreational Services','Museum of Piece & Quiet','Oakley','','Bally','Bless','Versace','Vince','Xander Zhou','Calvin Klein','Clot','Greyhound','Leisure Projects','Poem','Q Design and Play','drew house',"Hao","Givenchy","Diesel","Bottega Veneta","BMW",'Supreme',"Mercedes","Victoria's Secret","Dunhill",'Dsquared2',"Van Cleef & Arpels",,'Hugo Boss','Dolce & Gabbana','Raf Simons',"Melting Saddness","UMA WANG",'VETEMENTS',"Yves Saint Laurent",'Lamborghini','Etro','Soulgoods','Salvatore Ferragamo'];


let i=0;
let flag=0;



function updatePlaceholderTxt(){
    
    if(input[0].style.color!="rgb(0, 0, 0)"){
            inputBox.value= messages[ Math.floor(Math.random() * messages.length)];
            wrapper[0].innerHTML='';
    }

}



if(!document.body){ setTimeout( addBlackBox,1000);
}





let m=1 , n= 56;
let linksArray;



var alteredWords_pre =[
    '泰酷啦！',
    '艺术家分享',
    '别偷偷看啦',
    '麻烦',
    '震惊！',
        '终于等到啦！',
        '排球少年求',
    '情绪巨婴：',
    '问过了，不管男女都喜欢',
    '世界上最大的谎言：',
    '存款500万',
    '存款1000万',
    '存款2000万',
        '存款4位数',
            '存款5位数',
        '存款6位数',
        '存款7位数',
        '月入4位数',
            '月入5位数',
        '月入6位数',
        '房奴的时代，也许才刚刚开始',
            '房奴的时代',
                '月薪三千',
                    '养不起就别生',
         '996啦',

]

var updatedWords = [ '张昊帅到语无伦次',
                 '张昊是大艺术家',
                '张昊帅到令人心疼',
                '张昊帅到分手',
                '张昊帅到掉渣',
                '张昊帅到发光',
                '张昊帅到没朋友',
];



var alteredWords_past =[
    '泰酷啦',
    '冲鸭',
    '沙雕',
    '皮皮虾 我们走',
    'C位出道',
    '吓死宝宝了',
    '中国人不骗中国人',
    '野性消费',
    '格局小了',
    '离开安全区',
    '我要996',
    '好卷',
    '一个白嫖....',
    '是要倒闭了嘛',
    '大怨种',
    '消费降级',
    '消费升级',
    '要的就是胶片感',
    '装B嘛',
    '三个鄙视链',
    
        '真消费才敢说真话',
    '就差你了',
        '真的好菜',
    '字节毕业啦',
    '中产返贫',
    '人生作弊',
    '7个人花13300元',
    '下半年价格战会不会停',
    '为了要气血',
        '商业思维',

        '认知',
            '格局',
    
]







function search(){
    
// a 5% chance user can get the result with no alteration.
// 40% chance user can get the result with altered keywords.
// 60% chance user get a completed keywords.
// the mechanism of changing remain opaque with no explicit rules. 
    

    let m = Math.random();
    
    if( m  > 0.5 ){
        
        if( m  > 0.75 ){
         updatedInputValue = alteredWords_pre[ Math.floor(Math.random() * alteredWords_pre.length) ] + ' ' + inputBox.value; //partially altered

        } else{
             updatedInputValue =  inputBox.value + ' ' +alteredWords_past[ Math.floor(Math.random() * alteredWords_past.length) ]  ; //partially altered

        }

    }else{
        if( m>0.25){
                     updatedInputValue = updatedWords [ Math.floor(Math.random() * updatedWords.length) ] ; // complete changed words 

        }else{
            updatedInputValue = inputBox.value; // keep it same
        }
        
    }
    

    
    
    let updatedURL = "https://s.weibo.com/weibo?q=" +  encodeURI( updatedInputValue );    
     window.open(updatedURL, "_self	");
    
    
}

function veggieSearch(){
    
    let veggie =  veggiesArray[ Math.floor(Math.random() * veggiesArray.length) ];
    
      let v_updatedURL = "https://s.weibo.com/weibo?q=" +  encodeURI( veggie );    
    console.log(veggie);
     window.open(v_updatedURL, "_self	");
    
}









function updateLogo() { 
    
            var img = document.createElement('img'); 
            img.src =  'images/cene04.png'; 
            img.width=82;
           document.getElementsByClassName('logo')[0].appendChild(img); 
}  



function addBlackBox(){
    
    if(!flag){

        linksArray=document.getElementsByTagName('a');

        for( m=1;m<linksArray.length;m++){
            
           // console.log(m,linksArray[m]);
            if( m!=0 || m!=67 || m!=65){

                linksArray[m].classList.add('blur');

            }
            
        }
        
      //  document.getElementsByTagName('a')[0].innerHTML='';
    //    document.getElementsByClassName('copyright')[0].innerHTML='';
    //    updatePlaceholderTxt();
         updateLogo();
        document.getElementsByTagName('title')[0].innerHTML='Search Search';
 //document.getElementsByClassName('s-btn-b')[0].innerText='瞎看看';
        flag=1;
         inputBox.focus(); 
        
    }
    
}


