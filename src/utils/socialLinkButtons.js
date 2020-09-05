export function socialLinkButtons(title = document.title, location = window.location.href) {
  return [
    {
      "name": "facebook",
      "title": "Facebook",
      "href": "https://www.facebook.com/sharer.php?t=" + encodeURIComponent(title) + "&u=" + location,
      "icon": "fa-facebook"
    },
    {
      "name": "twitter",
      "title": "Twitter",
      "href": "https://twitter.com/share?&text=" + encodeURIComponent(title) + "&url=" + location,
      "icon": "fa-twitter"
    },
    {
      "name": "linkedin",
      "title": "LinkedIn",
      "href": "http://www.linkedin.com/shareArticle?mini=true&url=" + location + "&title=" + encodeURIComponent(title),
      "icon": "fa-linkedin"
    },
  ];
}
