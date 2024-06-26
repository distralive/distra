# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.2](https://github.com/distralive/distra/compare/v0.7.1...v0.7.2) (2024-05-17)


### Bug Fixes

* reload comments after posting ([a359356](https://github.com/distralive/distra/commits/a35935676edcda64a3a255eea8110a2277e4b065))

### [0.7.1](https://github.com/distralive/distra/compare/v0.7.0...v0.7.1) (2024-05-17)


### Features

* add implementation of video visibility ([df4425c](https://github.com/distralive/distra/commits/df4425ce7efc747bdb3a3b561b18109b57286511))
* use vidstack video player instead of plyr ([9c1d7b9](https://github.com/distralive/distra/commits/9c1d7b9939ac5c5718fb3b8bbb9364c12ed450bd))


### Bug Fixes

* add better handling for the new video api endpoint ([0d9a62d](https://github.com/distralive/distra/commits/0d9a62d00a8a14eabb327c91baa95a6d02d0f73a))
* add parameter to getServerSession ([9a34c5c](https://github.com/distralive/distra/commits/9a34c5c06eafe8c066cd2ed0cb1dc26ae01f5fd0))

## [0.7.0](https://github.com/distralive/distra/compare/v0.6.0...v0.7.0) (2023-07-13)


### Features

* add a comment counter ([4f2061e](https://github.com/distralive/distra/commits/4f2061eb33abac347961a435182e69685cebcaa4))
* add bottom nav ([bb72385](https://github.com/distralive/distra/commits/bb72385a26a3220caa2c73898bba6d3b7492dbe9))
* add global roles and channel verification ([f58a915](https://github.com/distralive/distra/commits/f58a915d7582466557ae9c2b38ded77e9ef9b5c4))
* add initial video recommendation algorithm ([3d23069](https://github.com/distralive/distra/commits/3d23069fc708ee8e12d62c6971abdab0aaf56128))
* add tags to videos ([b6b6360](https://github.com/distralive/distra/commits/b6b636088074f0a4c0926ce97ee6bbaa89d6497a))
* **algorithm:** fetch videos liked by similar users ([b7ecfa6](https://github.com/distralive/distra/commits/b7ecfa667ab6ee4d279c427d6d780432825ebd95))
* **components:** add home-video-card component ([924b13d](https://github.com/distralive/distra/commits/924b13d60aee37c969146766115ef7c9ea4fabdf))
* make proper bottom nav ([8a48e2e](https://github.com/distralive/distra/commits/8a48e2e35a5eacb97b302b80f5d359ac2fc25f97))


### Bug Fixes

* add a check for session ([b865973](https://github.com/distralive/distra/commits/b865973e5e7cdf0652d1f7e4ea0b8671281ecf6e))

## [0.6.0](https://github.com/distralive/distra/compare/v0.5.1...v0.6.0) (2023-07-10)


### Features

* add settings page ([6d92b8f](https://github.com/distralive/distra/commits/6d92b8f69f67fc407274665b703c5c070292f144))

### [0.5.1](https://github.com/distralive/distra/compare/v0.5.0...v0.5.1) (2023-07-10)


### Features

* add version info in the hamburger menu ([87b0e9b](https://github.com/distralive/distra/commits/87b0e9b1bcb169f1ba11607cbb8e64e10a684296))


### Bug Fixes

* **comment-section:** add null checks for comment author ([b01ec7c](https://github.com/distralive/distra/commits/b01ec7ca017ab3dd046867b6d1e6cef24ce4ef58))

## [0.5.0](https://github.com/distralive/distra/compare/v0.4.3...v0.5.0) (2023-07-10)


### Features

* add a page for listing all the users ([380f751](https://github.com/distralive/distra/commits/380f751b64ff3d1a1e910638600a40f42645d862))
* **ux:** allow form interaction during uploads ([51b9acc](https://github.com/distralive/distra/commits/51b9acc905e7a03d80573a5aff52e7003eaab7c0))

### [0.4.3](https://github.com/distralive/distra/compare/v0.4.2...v0.4.3) (2023-07-09)


### Features

* actually fully delete videos when the route is called ([d23dd75](https://github.com/distralive/distra/commits/d23dd7534890f833edb5472afedf774e4d84e404))

### [0.4.2](https://github.com/distralive/distra/compare/v0.4.1...v0.4.2) (2023-07-09)


### Bug Fixes

* missing prop in FollowButton ([c77ca83](https://github.com/distralive/distra/commits/c77ca83927dc66b3073537b54df66dffbbbee7be))

### [0.4.1](https://github.com/distralive/distra/compare/v0.4.0...v0.4.1) (2023-07-09)


### Features

* add following user pfp if the user has one ([321ba4a](https://github.com/distralive/distra/commits/321ba4ab568ef641b0d3be758b96b23634af60f2))
* add hamburger-menu to user page ([7bf411d](https://github.com/distralive/distra/commits/7bf411d2e15c2d8938a6794d0872e4ac52e3af37))
* add types of visibility to videos ([17b84f7](https://github.com/distralive/distra/commits/17b84f75f144898d9b73f4d9092198dd294165fa))
* use signed urls if the video is private ([c194c54](https://github.com/distralive/distra/commits/c194c54d027aae62ab8badf47cdfda93cfb8695a))


### Bug Fixes

* delete button not showing on videos with thumbnails ([f777c4e](https://github.com/distralive/distra/commits/f777c4efc291a23075efac9d78461c89a35c7b32))

## [0.4.0](https://github.com/distralive/distra/compare/v0.3.1...v0.4.0) (2023-07-08)


### Features

* add hamburger menu on home page ([69d6827](https://github.com/distralive/distra/commits/69d6827f15c0d3f9afc4e3aeaa97eedb5826df17))

### [0.3.1](https://github.com/distralive/distra/compare/v0.3.0...v0.3.1) (2023-07-07)


### Features

* add proper follower counter ([ad32c09](https://github.com/distralive/distra/commits/ad32c090a476b32585469c073359e5f339bb9914))
* add proper unfollow handler ([ef7478a](https://github.com/distralive/distra/commits/ef7478a9ba38ec66af82649b745a94d1c66798fb))

## [0.3.0](https://github.com/distralive/distra/compare/v0.2.0...v0.3.0) (2023-07-06)


### Features

* add a route for deleting videos ([e1052f9](https://github.com/distralive/distra/commits/e1052f982ab580205055844a4052a4311c0e3c4d))
* add ability to delete a video ([425b4a7](https://github.com/distralive/distra/commits/425b4a73f0bab18200af2d1d9bfb775c59f64e04))
* **components:** add iconify wrapper (for server components) ([9dd0e1c](https://github.com/distralive/distra/commits/9dd0e1cfa904655267b573a894c849099add2d2a))

## [0.2.0](https://github.com/distralive/distra/compare/v0.1.2...v0.2.0) (2023-07-05)


### Features

* add ability to comment on videos and see them ([19027fd](https://github.com/distralive/distra/commits/19027fdd814608509014a8ad8716838eb0820820))
* add the ability to comment and reply to videos ([e721f5a](https://github.com/distralive/distra/commits/e721f5a0fd99d8f7db2aa04044dfd03de673f701))
* add the ability to follow people ([3e58e97](https://github.com/distralive/distra/commits/3e58e977355d40c8fcd92c384efb8fb57a049809))
* **components:** add follow button component ([97286c2](https://github.com/distralive/distra/commits/97286c2495f2045d51e508cba722ee32c541268f))


### Bug Fixes

* invalid GET export on follow route ([0afc6b7](https://github.com/distralive/distra/commits/0afc6b7092b792f39ba40c4fa48da338abe2042e))
* move follow route 1 folder back ([ce5e54b](https://github.com/distralive/distra/commits/ce5e54be50a3114a37dbe56a6cc8a6663b7e0d07))

### [0.1.2](https://github.com/distralive/distra/compare/v0.1.1...v0.1.2) (2023-07-03)

### 0.1.1 (2023-07-03)


### Features

* **a11y:** add aria-label to the upload button ([6d3c067](https://github.com/distralive/distra/commits/6d3c0675deede1c2beca1ab58ae7d597ea853c1e))
* add a function for fetching the mime type of the video ([769bdf6](https://github.com/distralive/distra/commits/769bdf6aafb523d91277de35433c8c626ac40151))
* add a page for showing a user's channel ([04fa1e9](https://github.com/distralive/distra/commits/04fa1e9af5f79378c10076cd27b42e7648cc959d))
* add a route that returns user info ([fc9d709](https://github.com/distralive/distra/commits/fc9d709fffd5c30a6b42608f823bdc302ef53e0b))
* add a route to get the amount of likes/dislikes ([880397e](https://github.com/distralive/distra/commits/880397e66ccb389c7c0ea615878e2caace68a17e))
* add an upload form ([401ff8e](https://github.com/distralive/distra/commits/401ff8ec5d2bbbe4fc4800b96895cb4dc92b1862))
* add aws secrets to env ([e76a3f3](https://github.com/distralive/distra/commits/e76a3f3d870ab2e479ca9c1ca12fbfe99c90b429))
* add comfortaa font ([3c799c5](https://github.com/distralive/distra/commits/3c799c58ab925d0e188d078a8c0f9b74a119617f))
* add initial implementation of uploading ([98ff548](https://github.com/distralive/distra/commits/98ff548429a465829e62175843106330fa95c9cf))
* add initial video thumbnail feature ([50372af](https://github.com/distralive/distra/commits/50372afaa29f4c94b19c208469f7712ea102e6a4))
* add like/dislike button for videos ([fa671d4](https://github.com/distralive/distra/commits/fa671d4772120ab312d6549aec1fb6480d72522e))
* add next-auth ([58f8d8e](https://github.com/distralive/distra/commits/58f8d8ed2bdfe60c4494d1fa2b02d1d7091bba56))
* add next-themes ([57d2752](https://github.com/distralive/distra/commits/57d2752e32f2c9728f8b9e8ac8a2d0ea28f369e3))
* add page for watching videos ([9af338c](https://github.com/distralive/distra/commits/9af338c5a4d135550c3d9fb5ec9348a4d8a3fbdd))
* add route for liking/disliking a video ([9388821](https://github.com/distralive/distra/commits/9388821d1dc2f2ab4fe02dc1c687be0ba38e2733))
* add s3 sdk ([b27d631](https://github.com/distralive/distra/commits/b27d631ada259dde809347881c40448f64a760e3))
* add shadcn/ui ([e17c4fe](https://github.com/distralive/distra/commits/e17c4fe8229fb157d59849883b0796e627284de2))
* add styling for the upload form ([8ce1813](https://github.com/distralive/distra/commits/8ce18134ea22b2f3621a0c22331defe9f767a683))
* add thumbnails for videos ([bd4aa96](https://github.com/distralive/distra/commits/bd4aa96f06d0da27e1e51bbd21bc456c31d61502))
* add video title and information of author of video... ([efa5b68](https://github.com/distralive/distra/commits/efa5b68e10ede228f8cddce7c196af0ad630e1a9))
* **api:** add a route for fetching videos from db ([a33d408](https://github.com/distralive/distra/commits/a33d408b53ad4a300c6f002365754cfd8969ad24))
* **auth:** add a callback that returns the user id ([ddf3ab6](https://github.com/distralive/distra/commits/ddf3ab6e7bffe7bb3fb437c93a2d8f29a4cbb596))
* **components:** add avatar and user-avatar components ([05355bc](https://github.com/distralive/distra/commits/05355bc76c7d630f304d41db5b778040b530dfa5))
* **components:** add button and dropdown menu components ([eab9941](https://github.com/distralive/distra/commits/eab9941533de354dde91ebffe108e5e3611239fc))
* **components:** add channel card and video card components ([c4ac121](https://github.com/distralive/distra/commits/c4ac121c24092d033ad0594bf5254b8a4aabebdd))
* **components:** add form component ([a8bcea9](https://github.com/distralive/distra/commits/a8bcea99e0a8e40938e260a9645a900b37e24384))
* **components:** add input and textarea components ([25d484a](https://github.com/distralive/distra/commits/25d484a2a1912aae4cebabf19ae148c01b91c07a))
* **components:** add label component ([5046b0f](https://github.com/distralive/distra/commits/5046b0fea4cc31cec3fdaef061565b5ff2f05a46))
* **components:** add navbar component ([cb13245](https://github.com/distralive/distra/commits/cb1324577f7ff7c4d271e9d834528b83e9e6fabf))
* **components:** add user-account-nav component ([33dd3df](https://github.com/distralive/distra/commits/33dd3dfae0f18a54d550580d06352bad2727d411))
* **components:** add video player component ([13c9c1f](https://github.com/distralive/distra/commits/13c9c1fb451d8d98e18c86a06210defe99ede0e7))
* link "your channel" to the user's personal channel ([c411cb3](https://github.com/distralive/distra/commits/c411cb366d6b09f21ee5f72ecaf8d03e35e6da89))
* make s3Client conditional ([f23c0d8](https://github.com/distralive/distra/commits/f23c0d8f1408ac629a65f0b67f53827a5e447056))
* redirect to home after uploading video ([0e80c3d](https://github.com/distralive/distra/commits/0e80c3d09a434e5315595105c0050486bb6392cd))
* use channel and video card in user page ([709b92d](https://github.com/distralive/distra/commits/709b92d14137d2d23a07331c57f3bb42b192704c))
* use plyr instead of video.js ([18792c9](https://github.com/distralive/distra/commits/18792c9bd740a0223265f678a74de27c2aabac13))


### Bug Fixes

* add some dependencies because s3 was crapping itself ([81d076b](https://github.com/distralive/distra/commits/81d076bed137be3b3ebd71befafab912230eb134))
* manually parse the request body ([1ee044d](https://github.com/distralive/distra/commits/1ee044dc26c0d6f4d2cf97ec09a531aa211f2da5))
