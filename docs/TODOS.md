1. FAQ page -> json+ld seo

2. fallback images for svg -> just rasterize svgs...

3. decompose complexity vs number of users into multiple input element. adjust pricing config so parameter is [].

4. style about component between widths 991px and 431px,i.e. "landscape mode". (mobile scroller breaks at these widths)

5. generalize resume component

6. cloudfront serves the root index.html on all paths, effectively rendering the prerender routine moot. the nested indexes are not being served. will need to write custom handlers to return the appropriate indices...i think this is the best soltuion anyway: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions.html

7. add accessiblity attr to svgs: https://stackoverflow.com/questions/4697100/accessibility-recommended-alt-text-convention-for-svg-and-mathml

8. add conversion events: https://www.npmjs.com/package/ngx-google-analytics
