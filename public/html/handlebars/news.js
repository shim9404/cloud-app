const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
//데이터 관리
//전역 상태 관리를 위한 간단한 store 객체를 사용하고 있습니다.
//현재 페이지 정보만 관리하고 있어 확장성이 제한적입니다.
const store = {
  currentPage: 1,
};
//XMLHttpRequest를 동기(synchronous) 방식으로 사용하고 있습니다.
//false 파라미터는 동기 통신을 의미하며, 이는 사용자 경험을 저하시킬 수 있습니다.
//에러 처리가 없어 네트워크 오류나 잘못된 응답에 대한 처리가 부족합니다.
function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];
  // DOM API를 사용하면 위계가 잘 보이지 않는다.(직관적이지 않다.)
  // document.createElement('')
  let template = `
    <div class="container mx-auto p-4">
      <h1>Hacker News</h1>
      <ul>
        {{__news_feed__}}      
      </ul>
      <div>
        <a href="#/page/{{__prev_page__}}">이전 페이지</a>
        <a href="#/page/{{__next_page__}}">다음 페이지</a>
      </div>
    </div>
  `;

  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    // newsList는 배열이다.
    newsList.push(`
      <li>
        <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  }
//페이지네이션
//한 페이지당 10개의 항목을 보여주는 페이지네이션이 구현되어 있습니다.
//전체 페이지 수를 계산하여 마지막 페이지에서의 동작을 제한하고 있습니다.
  const totalPages = Math.ceil(newsFeed.length / 10);

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : store.currentPage);
  template = template.replace('{{__next_page__}}', store.currentPage < totalPages ? store.currentPage + 1 : store.currentPage);
  
  container.innerHTML = template;
}

function newsDetail() {
  const id = location.hash.substring(7);
  const newsContent = getData(CONTENT_URL.replace('@id', id))

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}
//라우팅
//해시(#) 기반으로 동작하는 라우팅 시스템입니다.
//라우팅 경로에 따라 다른 페이지를 보여주는 기능을 구현하고 있습니다.
function router() {
  const routePath = location.hash;

  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail()
  }
}

window.addEventListener('hashchange', router);

router();