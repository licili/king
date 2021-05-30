function $(cssSelector) {
  return document.querySelector(cssSelector);
}


// banner
~ function () {
  let bannerWrapper = $('.banner');
  let sliderWrapper = bannerWrapper.querySelector('.slider-wrapper');
  let dotArr = bannerWrapper.querySelectorAll('.dot>span')
  let goTo = createSlider(sliderWrapper, 1000, (index) => {
    let dotActive = bannerWrapper.querySelector('.dot>.active');
    dotActive && dotActive.classList.remove('active');
    dotArr[index].classList.add('active')
  })
}()

// menu
~function () {
  let expand = $('.menu>.expand');
  let menuList = $('.menu>.menu-list');
  let txt = expand.querySelector('.txt');
  let i = expand.querySelector('i')
  let isExpand = false;

  expand.addEventListener('click', function (e) {
    let isWrap = isExpand ? 'noWrap' : 'wrap'
    let content = isExpand ? '展开' : '收起';
    if (isExpand) {
      expand.querySelector('i.spr_collapse') && i.classList.remove('spr_collapse');
      i.classList.add('spr_expand');

    } else {
      expand.querySelector('i.spr_expand') && i.classList.remove('spr_expand');
      i.classList.add('spr_collapse');
    }
    menuList.style.flexWrap = isWrap;
    txt.innerText = content;
    isExpand = !isExpand;

  })
}()

//  news
~ async function () {
  let newsBlock = $('.news');
  let slideWrapper = newsBlock.querySelector('.slider-wrapper')
  let newsList = await fetch('./data/news.json').then(res => {
    return res.json();
  })
  // console.log(newsList);
  let result = Object.values(newsList).map(news => {
    return `<div class="slider-item">
      <ul>
      ${news.map(item => {
        return `<li>
        <a href="${item.link}" class="${item.type}">
          <span class="title">${item.title}</span>
          <span class="time">${item.pubDate}</span>
        </a>
      </li>`
      }).join('')}
      </ul>
    </div>`
  }).join('')
  // console.log(slideWrapper);
  slideWrapper.innerHTML = result;
  createBlock(newsBlock);
}()


// heros list
~ async function () {
  let herosBlock = $('.heros');
  let slideWrapper = herosBlock.querySelector('.slider-wrapper')
  let heroList = await fetch('./data/hero.json').then(res => {
    return res.json();
  })

  let heroObj = {remen:[],tanke:[],zhanshi:[],fashi:[],cike:[],sheshou:[],fuzhu:[]};
  heroList.forEach(item => {
    let type = item.hero_type
    let type2 = item.hero_type2;
    // 热门英雄
      /* 
        1-战士
        2-法师
        3-坦克
        4-刺客
        5-射手
        6-辅助
       */
    if (item.hot === 1) {
      heroObj['remen'].push(item)
    }
    if (parseInt(type) === 1 || parseInt(type2) === 1) {
      heroObj['zhanshi'].push(item);
    }
    if (parseInt(type) === 2 || parseInt(type2) === 2) {
       heroObj['fashi'].push(item);
    }
    if (parseInt(type) === 3 || parseInt(type2) === 3) {
       heroObj['tanke'].push(item);
    }
    if (parseInt(type) === 4 || parseInt(type2) === 4) {
       heroObj['cike'].push(item);
    }
    if (parseInt(type) === 5 || parseInt(type2) === 5) {
       heroObj['sheshou'].push(item);
    }
    if (parseInt(type) === 6 || parseInt(type2) === 6) {
      heroObj['fuzhu'].push(item);
    }
  })

  let heroHTML = Object.values(heroObj).map(heros => {
    return `<div class="slider-item">
      ${heros.map(item => {
        return `<a href="javascript:;">
          <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg">
          <span>${item.cname}</span>
        </a>`
      }).join('')}
      </ul>
    </div>`
  }).join('')
  slideWrapper.innerHTML = heroHTML;
  createBlock(herosBlock);
}()

// videos 
~async function () {
  console.log('video');
  let videosBlock = $('.videos');
  let slideWrapper = videosBlock.querySelector('.slider-wrapper')
  let videoList = await fetch('./data/video.json').then(res => {
    return res.json();
  })
  console.log(videoList);
  let videosHTML = Object.values(videoList).map(videos => {
    return `<div class="slider-item">
      ${videos.map(item => {
        return `<a href="${item.link}">
          <img src="${item.cover}" alt="">
          <span class="title">${item.title}</span>
          <div class="desc">
            <span class="num"><i class="spr spr_videonum"></i>${item.playNumber}</span>
            <span class="date">${item.pubDate}</span>
          </div>
        </a>`
      }).join('')}
    </div>`
  }).join('')
  slideWrapper.innerHTML = videosHTML;
  createBlock(videosBlock);
}()