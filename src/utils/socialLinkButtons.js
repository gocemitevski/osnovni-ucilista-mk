import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export function socialLinkButtons(title = document.title, location = window.location.href) {
  return [
    {
      "name": "facebook",
      "title": "Facebook",
      "href": "https://www.facebook.com/sharer.php?t=" + encodeURIComponent(title) + "&u=" + encodeURIComponent(location),
      "icon": faFacebook
    },
    {
      "name": "twitter",
      "title": "Twitter",
      "href": "https://twitter.com/share?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(location),
      "icon": faTwitter
    },
    {
      "name": "linkedin",
      "title": "LinkedIn",
      "href": "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(location) + "&title=" + encodeURIComponent(title),
      "icon": faLinkedin
    },
  ];
}
