'use strict';

const titleClickHandler = function (event) {
  //display an article after clicking
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const articles = document.querySelectorAll('article.active');

  for (let article of articles) {
    article.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
//optArticleTagSelector = '.post-tags .list'; eslint returns error if saved it this way!!
const optArticleTagSelector = '.post-tags .list';

// eslint-disable-next-line no-inner-declarations
function generateTitleLinks() {
  //remove content of title list
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  //for each article
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for (let article of articles) {
    // get the article id
    const articleId = article.getAttribute('id');
    //find title element + get the title from the title element
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //create HTML of the link
    const linkHTML =
      '<li><a href ="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    //insert link into html variable
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// eslint-disable-next-line no-inner-declarations
function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagSelector);
    console.log('tagsWrapper', tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHTML =
        '<li><a href ="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      /* add generated code to html variable */
      html = html + tagHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('tags wrapper HTML', html);
  }
  /* END LOOP: for every article: */
}
generateTags();

// eslint-disable-next-line no-inner-declarations
function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href of clicked element', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTaglink of activeTagLinks) {
    /* remove class active */
    activeTaglink.remove.classList('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

// eslint-disable-next-line no-inner-declarations
function addClickListenersToTags() {
  /* find all links to tags */
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}
addClickListenersToTags();
