'use strict';
{
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

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  //optArticleTagSelector = '.post-tags .list'; eslint returns error if saved it this way!!
  const optArticleTagSelector = '.post-tags .list';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleList() {
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

  generateTitleList();

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagWrapper = article.querySelectorAll(optArticleTagSelector);
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
          '<li><a href ="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
        html = html + tagHTML;
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;
      console.log(tagWrapper);
    }
    /* END LOOP: for every article: */
  }
  generateTags();
}
