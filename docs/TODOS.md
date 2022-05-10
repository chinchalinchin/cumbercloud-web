1. FAQ page -> json+ld seo

2. fallback images for svg -> just rasterize svgs...

3. decompose complexity vs number of users into multiple input element. adjust pricing config so parameter is [].

4. style about component between widths 991px and 431px,i.e. "landscape mode". (mobile scroller breaks at these widths)

5. generalize resume component

6. add accessiblity attr to svgs: https://stackoverflow.com/questions/4697100/accessibility-recommended-alt-text-convention-for-svg-and-mathml

7. add cloudfront edge functions for index.html to cloudformation tempalte.

8. pass routing params through route to archive component so archive can be filtered on load. you can pass links to "series"

9. need cicd to update cloudfront edge everytime a new article is added: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/update-function.html

10. dynamic table of contents on article page? would require shifting toc into config and hardcoding some ids...might be worth it.

### articles

1. angular and seo

2. angular and cicd

3. angular and responsive web apps

4. angular and prerenderings
