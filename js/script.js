'use strict';

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),
  //tagLink: Handlebars.compile(
  //  document.querySelector('#template-tag-link').innerHTML
  //),
};

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorListSelector: '.list.authors',
};

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

function generateTitleLinks(customSelector = '') {
  //remove content of title list
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';
  //for each article
  const articles = document.querySelectorAll(
    opt.articleSelector + customSelector
  );
  let html = '';
  for (let article of articles) {
    // get the article id
    const articleId = article.getAttribute('id');
    //find title element + get the title from the title element
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
    //create HTML of the link
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);

  return opt.cloudClassPrefix + classNumber;
}

// eslint-disable-next-line no-inner-declarations
function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opt.articleTagSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTMLTagData = { tag };
      const linkHTML = templates.tagLink(linkHTMLTagData);
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }
  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opt.tagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML +=
      '<li><a class="' +
      tagLinkHTML +
      '" ' +
      'href="#tag-' +
      tag +
      '"</a>' +
      tag +
      ' </li>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999,
    };

    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }
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
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
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
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  for (let tagLink of tagLinks)
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(opt.articleSelector);
  const authorList = document.querySelector(opt.authorListSelector);
  let html = '';
  for (let article of articles) {
    const authorWrapper = article.querySelector(opt.articleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    authorWrapper.innerHTML =
    '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
  }
  const obj = {
    a: 1,
    b: 2
  }
  Object.keys(allAuthors).forEach((author) => {
    const authorHTML =
    '<li><a href="#author-' +
    author +
    '">' +
    author + 
    allAuthors[author] +
    '</a></li>';
    html = html + authorHTML;
  })


  console.log(allAuthors);
  authorList.innerHTML = html;
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log('href of clicked author', href);
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('active authors', activeAuthors);
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks', authorLinks);

  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
