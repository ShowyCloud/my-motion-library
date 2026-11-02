(function(g){
'use strict';
// Each material is rendered by an exported helper from its original pack.
const items=[
 ['star','星形','图形','motion','star','示例 #001、#003',256,256],
 ['heart','红色爱心','图形','motion','heart','示例 #001、#003',256,256],
 ['icon-star','星形应用图标','图形','motion','iconStar','示例 #001',256,256],
 ['icon-heart','爱心应用图标','图形','motion','iconHeart','示例 #001',256,256],
 ['person','站立人物','人物','camera','person','镜头类示例 #025–#048、#170、#178 共用人物',256,256],
 ['person-walk','行走人物','人物','camera','walker','镜头类示例 #025–#048、#173 共用人物',256,256],
 ['person-arms','举手人物','人物','camera','personArms','镜头类示例 #037、#040',256,256],
 ['tree-camera','圆冠树','物体','camera','tree','镜头类示例 #025–#048',256,256],
 ['building-camera','楼房','物体','camera','building','镜头类示例 #025–#048',256,256],
 ['post-camera','路桩','物体','camera','post','镜头类示例 #025–#048',256,256],
 ['picture-blue','蓝天山景插画','背景','lp2','photoBlue','示例 #076–#078、#082、#090–#092、#152、#157、#161–#162 同一绘图模板',512,288],
 ['picture-sunset','暖色山景插画','背景','lp2','photoSunset','网页示例中的插画',512,288],
 ['picture-night','夜色山景插画','背景','lp2','photoNight','网页示例中的插画',512,288],
 ['tee-front','T 恤正面','物体','lp2','teeFront','示例 #155',256,256],
 ['tee-back','T 恤背面','物体','lp2','teeBack','示例 #155',256,256],
 ['cloud','云朵','物体','lp2','cloud','示例 #168',256,256],
 ['cursor','鼠标指针','图形','lp2','cursor','网页交互类示例',256,256],
 ['heart-like','点赞爱心','图形','lp2','heart','示例 #166',256,256],
 ['check','勾选标记','图形','lp2','check','示例 #159、#160',256,256],
 ['button','圆角按钮','界面','lp2','button','网页交互类示例',256,256],
 ['sea','海面与帆船','背景','motion2','sea','示例 #144',539,208],
 ['mountain','山脉','背景','motion2','mountain','示例 #144',539,208],
 ['city','夜晚城市','背景','motion2','city','示例 #144',539,208],
 ['field','风车田野','背景','motion2','field','示例 #144',539,208],
 ['photo-person','摄影示意人物','人物','photo','person','摄影效果类示例',256,256],
 ['photo-car','摄影示意汽车','物体','photo','car','摄影效果类示例',256,256],
 ['photo-tree','摄影示意树','物体','photo','tree','摄影效果类示例',256,256],
 ['photo-sun','太阳与光晕','物体','photo','sun','摄影效果类示例',256,256],
 ['photo-lamp','街灯','物体','photo','lamp','摄影效果类示例',256,256],
 ['bell','摇铃','物体','motion2','bell','示例 #124',256,256],
 ['paper-plane','纸飞机','物体','motion2','plane','示例 #126',256,256],
 ['phone-back','手机后盖','物体','motion2','phoneBack','示例 #143 的分解部件',256,256],
 ['phone-battery','手机电池','物体','motion2','phoneBattery','示例 #143 的分解部件',256,256],
 ['phone-board','手机电路板','物体','motion2','phoneBoard','示例 #143 的分解部件',256,256],
 ['phone-screen','手机屏幕','物体','motion2','phoneScreen','示例 #143 的分解部件',256,256],
 ['backpack','旅行背包','物体','lp2','backpack','示例 #163',256,256],
 ['camera-face','带眼睛的人物','人物','camera2','personFace','镜头类示例',256,256],
 ['camera-car','镜头示意汽车','物体','camera2','car','镜头切换类示例',256,256],
 ['photo-person-night','夜景人物剪影','人物','photo','personNight','摄影效果类示例',256,256],
 ['photo-bust','摄影半身人物','人物','photo','bust','摄影效果类示例',256,256],
 ['photo-bust-night','夜景半身人物','人物','photo','bustNight','摄影效果类示例',256,256],
 ['photo-car-night','夜景汽车','物体','photo','carNight','摄影效果类示例',256,256],
 ['photo-building-day','摄影示意楼房','物体','photo','buildingDay','摄影效果类示例',256,256],
 ['photo-building-night','夜景楼房','物体','photo','buildingNight','摄影效果类示例',256,256],
 ['photo-portrait-day','摄影背景：日间远山','背景','photo','portraitDay','摄影光线类示例，人物已分离',539,208],
 ['photo-portrait-night','摄影背景：夜色远山','背景','photo','portraitNight','摄影光线类示例，人物已分离',539,208],
 ['photo-street-day','摄影背景：日间街道','背景','photo','streetDay','摄影镜头类示例，人物汽车已分离',539,208],
 ['photo-street-night','摄影背景：夜晚街道','背景','photo','streetNight','摄影镜头类示例，人物汽车已分离',539,208],
 ['photo-land-day','摄影背景：日间山丘','背景','photo','landscapeDay','摄影调色类示例，人物已分离',539,208],
 ['photo-land-night','摄影背景：夜晚山丘','背景','photo','landscapeNight','摄影调色类示例，人物已分离',539,208],
 ['motion-day','白天转场画面（含文字）','背景','motion','dayScene','示例 #017–#019',539,208],
 ['motion-night','夜晚转场画面（含文字）','背景','motion','nightScene','示例 #017–#019',539,208],
 ['bounce-character','弹跳小球角色','人物','motion','bounceCharacter','示例 #011',256,256],
 ['morph-circle','变形圆形','图形','motion','morphCircle','示例 #012',256,256],
 ['morph-square','变形方形','图形','motion','morphSquare','示例 #012',256,256],
 ['morph-star','变形星形','图形','motion','morphStar','示例 #012',256,256],
 ['morph-heart','变形爱心','图形','motion','morphHeart','示例 #012',256,256],
 ['parallax-scene','视差山景（静帧）','背景','motion','parallaxScene','示例 #016，静止画面',539,208],
 ['follow-character','旗子尾巴角色','人物','motion2','followCharacter','示例 #122',256,256],
 ['impact-yellow','弹跳黄球','物体','motion2','impactYellow','示例 #123',256,256],
 ['impact-coral','弹跳红球','物体','motion2','impactCoral','示例 #123',256,256],
 ['sea-pattern','海洋帆船图案（静帧）','背景','motion2','seaPattern','示例 #133，静止画面',539,208],
 ['ui-mountain','界面山景图','背景','ui','mountains','示例 #058',512,288],
 ['ui-mountain-tint','界面淡蓝山景图','背景','ui','mountainsTint','界面示例中的山景图',512,288],
 ['ui-cursor','界面鼠标指针','图形','ui','cursor','界面交互类示例',256,256],
 ['sailboat','帆船','物体','motion2','sailboat','示例 #137、#144',256,256],
 ['windmill','风车','物体','motion2','windmill','示例 #141、#144',256,256],
 ['question-card','问答卡片：问题','界面','motion','questionCard','示例 #021',300,156],
 ['answer-card','问答卡片：答案','界面','motion','answerCard','示例 #021',300,156],
 ['zoom-page','ZOOM 文字画面','背景','motion','zoomPage','示例 #020，含文字',539,208],
 ['go-page','GO 文字画面','背景','motion','goPage','示例 #020，含文字',539,208],
 ['toggle-off','开关：关闭','界面','ui','toggleOff','示例 #059',256,256],
 ['toggle-on','开关：开启','界面','ui','toggleOn','示例 #059',256,256],
 ['tee-white-front','白色印花 T 恤正面','物体','lp2','teeWhiteFront','示例 #155',256,256],
 ['tee-white-back','白色印花 T 恤背面','物体','lp2','teeWhiteBack','示例 #155',256,256],
 ['tee-orange-front','橙色印花 T 恤正面','物体','lp2','teeOrangeFront','示例 #155',256,256],
 ['tee-orange-back','橙色印花 T 恤背面','物体','lp2','teeOrangeBack','示例 #155',256,256],
 ['arrow-block','箭头方块','物体','motion2','arrowBlock','示例 #121',256,256],
 ['ping-pong-block','往返方块','物体','motion2','pingPongBlock','示例 #127',256,256],
 ['stop-star','定格动画星形','物体','motion2','stopStar','示例 #128',256,256],
 ['parallax-moon','视差山景月亮','物体','motion','parallaxMoon','示例 #016',256,256],
 ['parallax-tree-green','视差山景绿树','物体','motion','parallaxTreeGreen','示例 #016',256,256],
 ['parallax-tree-coral','视差山景红树','物体','motion','parallaxTreeCoral','示例 #016',256,256],
 ['parallax-far','视差远山层','物体','motion','parallaxFar','示例 #016，透明山脉图层',539,208],
 ['parallax-mid','视差中景山层','物体','motion','parallaxMid','示例 #016，透明山脉图层',539,208],
 ['notification-bell','通知铃铛图标','界面','ui','notificationBell','示例 #071',256,256],
 ['empty-box','空状态收纳盒','界面','ui','emptyBox','示例 #072',256,256],
 ['trash-icon','删除按钮图标','界面','ui','trash','示例 #072',256,256],
 ['member-card','蓝色会员卡','物体','lp2','memberCard','示例 #153，静止卡面',440,264],
 ['sea-backdrop','海洋背景（无帆船）','背景','motion2','seaBackdrop','示例 #137、#144，静止画面',539,208],
 ['field-backdrop','田野背景（无风车）','背景','motion2','fieldBackdrop','示例 #141、#144，静止画面',539,208],
 ['city-building-blue','夜城蓝色楼房','物体','motion2','cityBuildingBlue','示例 #144',256,256],
 ['city-building-dark','夜城深色楼房','物体','motion2','cityBuildingDark','示例 #144',256,256],
 ['top-tree','俯视圆冠树','物体','camera2','topTree','示例 #181',256,256],
 ['top-car','俯视汽车','物体','camera2','topCar','示例 #181',256,256],
 ['top-person','俯视人物','人物','camera2','topPerson','示例 #181',256,256],
 ['camera-flower','镜头前景小花','物体','camera2','flower','示例 #033、#182',256,256],
 ['pov-left-arm','主观镜头左臂','人物','camera2','povLeftArm','示例 #179，静态图层',256,256],
 ['pov-right-arm','主观镜头右臂与手机','人物','camera2','povRightArm','示例 #179，静态图层',256,256],
 ['foreground-shoulder','过肩镜头前景人物','人物','camera2','shoulder','示例 #180，未加模糊',256,256],
 ['top-building','俯视楼房','物体','camera2','topBuilding','示例 #181',256,256],
 ['watch-face','手表表盘','物体','camera2','watchFace','示例 #185，静止表盘',256,256],
 ['podium','演讲台','物体','camera2','podium','示例 #189',256,256],
 ['training-flag','训练终点旗','物体','camera2','flag','示例 #192',256,256],
 ['camera-mountain-backdrop','镜头山景网格背景','背景','camera2','mountainBackdrop','镜头示例场景，人物建筑树木已分离',539,208],
 ['camera-city-backdrop','镜头城市背景','背景','camera2','cityBackdrop','示例 #187–#190，人物汽车已分离',539,208],
 ['picture-sky-blue','插画蓝色天空','背景','lp2','pictureSkyBlue','网页示例中的山景插画，天空层',512,288],
 ['picture-sky-sunset','插画晚霞天空','背景','lp2','pictureSkySunset','网页示例中的山景插画，天空层',512,288],
 ['picture-sky-night','插画夜色天空','背景','lp2','pictureSkyNight','网页示例中的山景插画，天空层',512,288],
 ['picture-sun-blue','插画橙色太阳','物体','lp2','pictureSunBlue','网页示例中的山景插画',256,256],
 ['picture-sun-sunset','插画白色太阳','物体','lp2','pictureSunSunset','网页示例中的山景插画',256,256],
 ['picture-sun-night','插画夜色月亮','物体','lp2','pictureSunNight','网页示例中的山景插画',256,256],
 ['picture-far-blue','插画蓝色远山','物体','lp2','pictureFarBlue','网页示例中的山景插画，透明图层',512,288],
 ['picture-near-blue','插画蓝色近山','物体','lp2','pictureNearBlue','网页示例中的山景插画，透明图层',512,288],
 ['picture-far-sunset','插画晚霞远山','物体','lp2','pictureFarSunset','网页示例中的山景插画，透明图层',512,288],
 ['picture-near-sunset','插画晚霞近山','物体','lp2','pictureNearSunset','网页示例中的山景插画，透明图层',512,288],
 ['picture-far-night','插画夜色远山','物体','lp2','pictureFarNight','网页示例中的山景插画，透明图层',512,288],
 ['picture-near-night','插画夜色近山','物体','lp2','pictureNearNight','网页示例中的山景插画，透明图层',512,288],
 ['passerby-blue','蓝色远景行人','人物','camera2','passerbyBlue','示例 #171',256,256],
 ['passerby-grey','灰色远景行人','人物','camera2','passerbyGrey','示例 #171',256,256],
 ['grey-car','灰色汽车','物体','camera2','greyCar','示例 #175',256,256],
 ['camera-tripod','摄影机与三脚架标记','物体','camera2','tripod','示例 #175',256,256],
 ['camera-blue-leaf','蓝色飘叶','物体','camera2','blueLeaf','示例 #191，静止图层',256,256],
 ['camera-grey-leaf','灰色飘叶','物体','camera2','greyLeaf','示例 #191，静止图层',256,256],
 ['floating-phone','山景屏幕手机','物体','lp','floatingPhone','示例 #096，静止图层',256,256],
 ['floating-heart-badge','悬浮爱心徽章','物体','lp','heartBadge','示例 #096，含原阴影',256,256],
 ['floating-rating','悬浮评分卡片','界面','lp','ratingChip','示例 #096，含原阴影',256,256],
 ['pulse-heart','脉冲红色爱心','物体','motion2','pulseHeart','示例 #125，静止图层',256,256],
 ['boil-star','手绘线条星星','物体','motion2','boilStar','示例 #136，静止图层',256,256],
 ['boil-cloud','手绘线条云朵','物体','motion2','boilCloud','示例 #136，静止图层',256,256],
 ['camera-tower','带天线高楼','物体','camera2','tower','示例 #169、#177、#192',256,256],
 ['camera-rock','前景岩石','物体','camera2','rock','示例 #172、#174',256,256],
 ['window-wall','带透明窗洞的墙','物体','camera2','windowWall','示例 #176，可叠加其他背景',539,208],
 ['match-ball','匹配剪辑蓝球','物体','camera','matchBall','示例 #042，球和太阳的共同形状',256,256],
 ['sleeper','躺卧休息人物','人物','camera','sleeper','示例 #046',256,256],
 ['trail-ball','红白拖尾主球','物体','motion','trailBall','示例 #014，静止图层',256,256],
 ['particle-emitter','粒子发射器','物体','motion','emitter','示例 #015，单独绘制本体',256,256],
 ['finger-touch','触摸手指提示','界面','ui','fingerMark','示例 #051，触摸圆形标记',256,256],
 ['ui-tooltip','深色说明气泡','界面','ui','tooltip','示例 #054',440,140],
 ['ui-toast','保存成功提示','界面','ui','toast','示例 #056，静态图层',426,150],
 ['gradient-background','橙蓝渐变背景','背景','lp','gradientBackground','示例 #095，静止画面，无文字',511,168],
 ['photo-portrait-bare-day','日间远山空背景','背景','photo','portraitBareDay','摄影光线类示例，去除建筑和树灯',539,208],
 ['photo-portrait-bare-night','夜色远山空背景','背景','photo','portraitBareNight','摄影光线类示例，去除建筑和树灯',539,208],
 ['photo-street-bare-day','日间空街道','背景','photo','streetBareDay','摄影镜头类示例，去除人物汽车与街边物体',539,208],
 ['photo-street-bare-night','夜晚空街道','背景','photo','streetBareNight','摄影镜头类示例，去除人物汽车与街边物体',539,208],
 ['photo-land-bare-day','日间空山丘','背景','photo','landscapeBareDay','摄影调色类示例，去除人物房屋树与太阳',539,208],
 ['photo-land-bare-night','夜色空山丘','背景','photo','landscapeBareNight','摄影调色类示例，去除人物房屋树与太阳',539,208],
 ['photo-tree-night','摄影夜色树','物体','photo','treeNight','摄影夜景示例',256,256],
 ['photo-lamp-night','亮灯的夜景街灯','物体','photo','lampNight','摄影夜景示例',256,256],
 ['photo-house-day','日间山丘小屋','物体','photo','littleHouseDay','摄影调色类示例',256,256],
 ['photo-house-night','夜色山丘小屋','物体','photo','littleHouseNight','摄影夜景示例',256,256],
 ['video-sky','海景视频天空','背景','lp2','videoSky','示例 #168，静止天空',511,168],
 ['video-sun','海景视频太阳','物体','lp2','videoSun','示例 #168',256,256],
 ['video-mountain','海景视频远山','物体','lp2','videoMountain','示例 #168，透明图层',511,168],
 ['video-sea-far','海景视频远处海浪','物体','lp2','videoSeaFar','示例 #168，透明静帧',511,168],
 ['video-sea-middle','海景视频中景海浪','物体','lp2','videoSeaMiddle','示例 #168，透明静帧',511,168],
 ['video-sea-near','海景视频前景海浪','物体','lp2','videoSeaNear','示例 #168，透明静帧',511,168],
 ['photo-split-bust','分割光半身人物','人物','photo','splitBust','示例 #100，光线完成时静帧',256,256],
 ['photo-rembrandt-bust','伦勃朗光半身人物','人物','photo','rembrandtBust','示例 #101，光线完成时静帧',256,256],
 ['photo-butterfly-bust','蝴蝶光半身人物','人物','photo','butterflyBust','示例 #102，光线完成时静帧',256,256],
 ['camera-close-face','双眼特写人物','人物','camera2','closeFace','示例 #184，完整人物静帧',256,256],
 ['transition-sun','转场日光太阳','物体','motion2','transitionSun','示例 #138、#142',256,256],
 ['transition-cloud','转场白云','物体','motion2','transitionCloud','示例 #138、#142',256,256],
 ['transition-crescent','转场透明月牙','物体','motion2','transitionMoon','示例 #138，月牙透明镂空',256,256],
 ['transition-stars','夜晚转场星光','物体','motion2','transitionStars','示例 #138，透明图层',539,208],
 ['transition-day-empty','转场白天空背景','背景','motion2','transitionDayBackground','示例 #138、#142，无文字与物体',539,208],
 ['transition-night-empty','转场夜晚空背景','背景','motion2','transitionNightBackground','示例 #138，无文字与物体',539,208],
 ['chart-curve','上升曲线与箭头','图形','motion','graphLine','示例 #004，透明图层',539,208],
 ['chart-axes','图表坐标轴','图形','motion','graphAxes','示例 #004，透明图层',539,208],
 ['premium-badge','高级星标卡片','界面','motion','premiumBadge','示例 #022，静止卡片',440,160],
 ['new-title','上新标题牌','界面','motion','newTitle','示例 #024',360,160],
 ['sale-title','促销标题牌','界面','motion','saleTitle','示例 #024',360,160],
 ['photo-land-mono','黑白山丘背景','背景','photo','landscapeMono','示例 #115，人物已分离',539,208],
 ['photo-land-duo','双色调山丘背景','背景','photo','landscapeDuo','示例 #116，人物已分离',539,208],
 ['photo-land-teal-orange','青橙色调山丘背景','背景','photo','landscapeTealOrange','示例 #117，人物已分离',539,208],
 ['photo-person-mono','黑白摄影人物','人物','photo','monoPerson','示例 #115 的同色调人物',256,256],
 ['photo-person-duo','双色调摄影人物','人物','photo','duoPerson','示例 #116 的同色调人物',256,256],
 ['photo-person-teal-orange','青橙摄影人物','人物','photo','tealOrangePerson','示例 #117 的同色调人物',256,256],
 ['photo-bust-mono','黑白半身人物','人物','photo','monoBust','示例 #115',256,256],
 ['photo-bust-duo','双色调半身人物','人物','photo','duoBust','示例 #116',256,256],
 ['photo-bust-teal-orange','青橙半身人物','人物','photo','tealOrangeBust','示例 #117',256,256],
 ['photo-land-high','高调山丘背景','背景','photo','landscapeHigh','示例 #113，人物已分离',539,208],
 ['photo-land-low','低调山丘背景','背景','photo','landscapeLow','示例 #114，人物已分离',539,208],
 ['photo-bust-high','高调半身人物','人物','photo','highBust','示例 #113',256,256],
 ['photo-bust-low','低调半身人物','人物','photo','lowBust','示例 #114',256,256],
 ['photo-golden-background','黄金时刻场景背景','背景','photo','goldenBackground','示例 #103，人物已分离',539,208],
 ['photo-golden-bare','黄金时刻空远山','背景','photo','goldenBare','示例 #103，人物与主要物体已分离',539,208],
 ['photo-golden-bust','黄金时刻半身人物','人物','photo','goldenBust','示例 #103',256,256],
 ['photo-golden-tree','黄金时刻树','物体','photo','goldenTree','示例 #103',256,256],
 ['photo-golden-lamp','黄金时刻街灯','物体','photo','goldenLamp','示例 #103',256,256],
 ['photo-golden-sun','黄金时刻太阳','物体','photo','goldenSun','示例 #103，含光晕',256,256],
 ['section-morning-sun','早晨放射太阳','物体','lp2','morningSun','示例 #148',256,256],
 ['section-night-moon','夜间装饰月牙','物体','lp2','sectionMoon','示例 #148，透明镂空',256,256],
 ['section-blue-sky','夏季活动蓝色背景','背景','lp2','sectionSky','示例 #165，无文字',511,168],
 ['section-wave-back','夏季活动半透明波浪','物体','lp2','sectionWaveBack','示例 #165，透明静帧',511,168],
 ['section-wave-front','夏季活动白色波浪','物体','lp2','sectionWaveFront','示例 #165，透明静帧',511,168],
 ['photo-backlit-bust','逆光半身人物','人物','photo','backlitBust','示例 #097，保留轮廓光',256,256],
 ['photo-rim-bust','轮廓光半身人物','人物','photo','rimBust','示例 #098',256,256],
 ['photo-silhouette-bust','剪影半身人物','人物','photo','silhouetteBust','示例 #099',256,256],
 ['photo-double-exposure-bust','双重曝光半身人物','人物','photo','doubleExposureBust','示例 #120，内部风景合成静帧',256,256],
 ['repeater-blue','蓝色重复胶囊','图形','motion2','repeaterBlue','示例 #134',256,256],
 ['repeater-coral','珊瑚红重复胶囊','图形','motion2','repeaterCoral','示例 #134',256,256],
 ['repeater-yellow','黄色重复胶囊','图形','motion2','repeaterYellow','示例 #134',256,256],
 ['repeater-mint','薄荷绿重复胶囊','图形','motion2','repeaterMint','示例 #134',256,256],
 ['cube-face-a','立方体转场 A 面','界面','motion2','cubeFaceA','示例 #139，透明留边',280,176],
 ['cube-face-b','立方体转场 B 面','界面','motion2','cubeFaceB','示例 #139，透明留边',280,176],
 ['paper-page-a','翻页转场第 1 页','背景','motion2','paperPageA','示例 #140，静止画面',539,208],
 ['paper-page-b','翻页转场第 2 页','背景','motion2','paperPageB','示例 #140，静止画面',539,208],
 ['chart-bar-blue','蓝色图表柱','图形','motion','barBlue','示例 #002',256,256],
 ['chart-bar-coral','珊瑚红图表柱','图形','motion','barCoral','示例 #002',256,256],
 ['chart-bar-yellow','黄色图表柱','图形','motion','barYellow','示例 #002',256,256],
 ['chart-bar-mint','薄荷绿图表柱','图形','motion','barMint','示例 #002',256,256],
 ['ease-square-grey','匀速灰蓝方块','物体','motion','easeSquareGrey','示例 #009',256,256],
 ['ease-square-coral','缓动红色方块','物体','motion','easeSquareCoral','示例 #009',256,256],
 ['overshoot-gauge','回弹仪表盘','物体','motion','gauge','示例 #010，含静止指针',420,230],
 ['liquid-shape','液态图形组合','图形','motion','liquidShape','示例 #013，透明静帧，含水滴',539,208],
 ['kaleidoscope-pattern','万花筒图案','图形','motion2','kaleidoscope','示例 #135，透明静帧，含多种图形',539,208],
 ['glass-cracks','玻璃裂纹覆盖层','图形','motion2','glassCracks','示例 #142，透明静帧',539,208],
 ['gauge-dial','回弹仪表盘底盘','物体','motion','gaugeDial','示例 #010，透明静帧',420,230],
 ['gauge-needle','回弹仪表盘指针','物体','motion','gaugeNeedle','示例 #010，透明静帧',420,230]
].map(([id,name,category,pack,draw,source,width,height])=>({id,name,category,pack,draw,source,width,height}));
// The liquid droplets are rendered separately with the source goo filter.
for(let i=0;i<11;i++) items.push({id:'liquid-drop-'+String(i+1).padStart(2,'0'),name:(i===0?'液态主滴':'液态独立水滴')+' '+String(i+1).padStart(2,'0'),category:'物体',pack:'motion',draw:'liquidDrop'+i,source:'示例 #013，按原始参数单独重绘',width:128,height:128});
const kaleidColors=['蓝色','珊瑚红','黄色','薄荷绿'], kaleidShapes=['圆形','菱形','三角形'];
for(let i=0;i<13;i++) items.push({id:'kaleid-piece-'+String(i+1).padStart(2,'0'),name:'万花筒'+kaleidColors[i%4]+kaleidShapes[i%3]+' '+String(i+1).padStart(2,'0'),category:'图形',pack:'motion2',draw:'kaleidPiece'+i,source:'示例 #135，独立原型图形',width:256,height:256});
items.push({id:'kaleid-center-star',name:'万花筒中心八角星',category:'图形',pack:'motion2',draw:'kaleidCenter',source:'示例 #135，独立中心图形',width:256,height:256});
// Seven of the 52 generated polygons are wholly outside the 539×208 source
// frame; they have no original scene pixels to extract.
const visibleShardIndices=[...Array.from({length:41},(_,i)=>i),44,45,46,51];
for(const [prefix,label] of [['mountainShard','山景'],['dayShard','白天']]) for(const i of visibleShardIndices) items.push({id:'glass-'+(prefix==='mountainShard'?'mountain':'day')+'-'+String(i+1).padStart(2,'0'),name:label+'玻璃碎片 '+String(i+1).padStart(2,'0'),category:'物体',pack:'motion2',draw:prefix+i,source:'示例 #142，原画面内可见部分，含边缘',width:256,height:256});
for(let i=0;i<52;i++) items.push({id:'glass-outline-'+String(i+1).padStart(2,'0'),name:'玻璃碎片透明线框 '+String(i+1).padStart(2,'0'),category:'图形',pack:'motion2',draw:'glassOutline'+i,source:'示例 #142，完整原始多边形轮廓，无场景纹理',width:256,height:256});
const particleColors=['蓝色','珊瑚红','黄色','薄荷绿'],particleShapes=['圆形','方形','三角形'];
for(let i=0;i<12;i++) items.push({id:'particle-piece-'+String(i+1).padStart(2,'0'),name:'粒子'+particleColors[i%4]+particleShapes[i%3],category:'图形',pack:'motion',draw:'particlePiece'+i,source:'示例 #015，独立粒子原型',width:256,height:256});
for(let i=0;i<4;i++) items.push({id:'transition-band-'+i,name:'转场'+particleColors[i]+'色带',category:'图形',pack:'motion',draw:'transitionBand'+i,source:'示例 #018，单独色带静帧',width:340,height:92});
for(const [id,name,draw,category] of [['parallax-sky','视差夜空','parallaxSky','背景'],['parallax-stars','视差星光','parallaxStars','物体'],['parallax-near','视差近景山丘','parallaxNear','物体'],['parallax-foliage','视差前景暗影','parallaxFoliage','物体']]) items.push({id,name,draw,category,pack:'motion',source:'示例 #016，独立图层',width:539,height:208});
for(const [id,name,draw] of [['phone-side-back','手机后盖侧面','phoneSideBack'],['phone-side-battery','手机电池侧面','phoneSideBattery'],['phone-side-board','手机电路板侧面','phoneSideBoard'],['phone-side-screen','手机屏幕侧面','phoneSideScreen']]) items.push({id,name,draw,category:'物体',pack:'motion2',source:'示例 #143，分解部件侧面静帧',width:256,height:256});
for(const [id,name,draw,source] of [['photo-bokeh-lights','摄影散景灯光群','bokehLights','示例 #105'],['photo-vignette','摄影暗角覆盖层','vignette','示例 #112'],['photo-film-grain','胶片颗粒覆盖层','filmGrain','示例 #118'],['photo-light-leak','胶片漏光覆盖层','lightLeak','示例 #119']]) items.push({id,name,draw,source:source+'，透明静帧',category:'图形',pack:'photo',width:539,height:208});
for(let i=0;i<15;i++) items.push({id:'photo-bokeh-light-'+String(i+1).padStart(2,'0'),name:'独立散景光斑 '+String(i+1).padStart(2,'0'),category:'图形',pack:'photo',draw:'bokehLight'+i,source:'示例 #105，原参数静帧',width:256,height:256});
for(const [id,name,draw,source] of [['photo-exposure-trails','长曝光车灯轨迹','exposureTrails','示例 #107'],['photo-lens-flare','摄影镜头眩光','lensFlare','示例 #109']]) items.push({id,name,draw,source:source+'，透明静帧',category:'图形',pack:'photo',width:539,height:208});
items.push({id:'scene-sun',name:'分屏场景黄色太阳',draw:'sceneSun',source:'示例 #137、#144',category:'物体',pack:'motion2',width:256,height:256});
for(const [id,name,draw,category] of [['sea-sky-layer','帆船海景天空','seaSky','背景'],['sea-water-layer','帆船海面色层','seaWater','物体'],['sea-waves-layer','帆船海面波纹','seaWaves','物体'],['mountain-sky-layer','雪山场景天空','mountainSky','背景'],['mountain-peak-left','雪山左侧山峰','mountainPeakLeft','物体'],['mountain-peak-center','雪山中间山峰','mountainPeakCenter','物体'],['mountain-peak-right','雪山右侧山峰','mountainPeakRight','物体'],['mountain-ground','雪山绿色地面','mountainGround','物体']]) items.push({id,name,draw,category,pack:'motion2',source:'示例 #137、#144，独立静态图层',width:539,height:208});
for(const [id,name,draw,category,w,h] of [['field-sky-layer','田野天空','fieldSky','背景',539,208],['field-ground-layer','田野草地','fieldGround','物体',539,208],['field-cloud','田野白云','fieldCloud','物体',256,256],['field-flower-coral','田野红花','fieldFlowerCoral','物体',256,256],['field-flower-yellow','田野黄花','fieldFlowerYellow','物体',256,256],['city-sky-layer','夜城天空','citySky','背景',539,208],['city-moon','夜城白月','cityMoon','物体',256,256]]) items.push({id,name,draw,category,pack:'motion2',source:'示例 #141、#144，独立静态图层',width:w,height:h});
for(const i of [1,2,4,5,6]) items.push({id:'city-building-'+i,name:'夜城楼房 '+String(i+1).padStart(2,'0'),draw:'cityBuildingVariant'+i,category:'物体',pack:'motion2',source:'示例 #141、#144，含原始窗户',width:256,height:256});
for(const [id,name,draw,category,w,h] of [['camera-far-mountain','镜头世界远山','mountainFar','物体',539,208],['camera-near-mountain','镜头世界近山','mountainNear','物体',539,208],['camera-ground-grid','镜头世界透视地面网格','groundGrid','物体',539,208],['camera-sun-blue','镜头世界蓝色太阳','cameraSun','物体',256,256],['camera-cloud-grey','镜头世界灰白云','cameraCloud','物体',256,256],['camera-tree-blue','镜头世界浅蓝树','blueTree','物体',256,256]]) items.push({id,name,draw,category,pack:'camera',source:'镜头示例 #025–#048 的独立场景元素',width:w,height:h});
for(const [id,name,draw,source,w,h] of [['ui-modal','模态对话窗口','modal','示例 #049',340,200],['ui-drawer','侧边抽屉菜单','drawer','示例 #050',250,230],['ui-bottom-sheet','底部弹出面板','bottomSheet','示例 #051',600,240],['ui-dropdown-none','下拉选项列表','dropdownNone','示例 #053',320,160],['ui-dropdown-selected','下拉列表选中状态','dropdownSelected','示例 #053',320,160],['ui-popover','说明气泡卡片','popover','示例 #055',350,185]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'ui',width:w,height:h});
for(const [id,name,draw,source,w,h] of [['ui-pricing0','价格卡片：免费','pricing0','示例 #057',198,152],['ui-pricing1','价格卡片：980','pricing1','示例 #057',198,152],['ui-pricing2','价格卡片：1980','pricing2','示例 #057',198,152],['ui-carousel-circles','轮播圆形图卡','carouselCircles','示例 #058',370,178],['ui-carousel-bars','轮播柱形图卡','carouselBars','示例 #058',370,178],['ui-segment-day','分段控件：日','segmentedDay','示例 #060',340,80],['ui-segment-week','分段控件：周','segmentedWeek','示例 #060',340,80],['ui-segment-month','分段控件：月','segmentedMonth','示例 #060',340,80]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'ui',width:w,height:h});
for(const [id,name,draw,source,w,h] of [['ui-chip-all','筛选标签：全部','chipAll','示例 #061',140,74],['ui-chip-new','筛选标签：新品','chipNew','示例 #061',140,74],['ui-chip-popular','筛选标签：热门','chipPopular','示例 #061',140,74],['ui-chip-free','筛选标签：免费','chipFree','示例 #061',140,74],['ui-chip-new-selected','筛选标签：新品已选','chipNewSelected','示例 #061',140,74],['ui-chip-free-selected','筛选标签：免费已选','chipFreeSelected','示例 #061',140,74],['ui-stepper-one','步进器：数值 1','stepperOne','示例 #063',240,100],['ui-stepper-four','步进器：数值 4','stepperFour','示例 #063',240,100],['ui-spinner','加载旋转图标','loadingSpinner','示例 #070',256,256],['ui-loading-done','加载完成图标','loadingDone','示例 #070',256,256]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'ui',width:w,height:h});
for(let i=1;i<=3;i++) items.push({id:'ui-notification-badge-'+i,name:'通知数字徽标 '+i,draw:'notificationBadge'+i,source:'示例 #071，静止界面素材',category:'界面',pack:'ui',width:256,height:256});
for(const [id,name,draw,source,w,h] of [['ui-accordion-closed','折叠列表：收起','accordionClosed','示例 #052',542,70],['ui-accordion-open','折叠列表：展开','accordionOpen','示例 #052',542,130],['ui-slider-handle','价格滑块把手','sliderHandle','示例 #062',256,240],['ui-slider-active','价格滑块把手：激活','sliderActive','示例 #062',256,240],['ui-pagination1','分页器：第 1 页','pagination1','示例 #064',350,70],['ui-pagination2','分页器：第 2 页','pagination2','示例 #064',350,70],['ui-pagination3','分页器：第 3 页','pagination3','示例 #064',350,70],['ui-menu-icon','菜单三横图标','menuIcon','示例 #065',256,256],['ui-close-icon','菜单关闭图标','closeIcon','示例 #065',256,256]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'ui',width:w,height:h});
for(let i=0;i<4;i++) for(const [state,label] of [['pending','未开始'],['current','进行中'],['done','已完成']]) { if(i===3&&state==='current')continue; items.push({id:'ui-step-'+i+'-'+state,name:'步骤：'+['输入','确认','付款','已完成'][i]+'（'+label+'）',draw:'step'+i+state,source:'示例 #068，静止界面素材',category:'界面',pack:'ui',width:100,height:100}); }
for(const [id,name,draw,source,w,h] of [['ui-course-card','课程卡片','courseCard','示例 #066',198,158],['ui-course-card-hover','课程卡片：悬停','courseCardHover','示例 #066',198,158],['ui-mega-menu','多列展开菜单','megaMenu','示例 #067',590,200],['ui-skeleton-row','骨架屏列表行','skeletonRow','示例 #069',542,100],['ui-empty-add','空状态添加按钮','emptyAdd','示例 #072',152,70]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'ui',width:w,height:h});
const pending=new Map();
let userPromise=null;
function loadUser(force=false){
 if(force)userPromise=null;
 if(userPromise)return userPromise;
 userPromise=(async()=>{const response=await fetch('/api/editor/materials',{cache:'no-store'});if(!response.ok)throw Error('自选素材读取失败');const data=await response.json();if(!Array.isArray(data.materials))throw Error('自选素材格式无效');
  for(const m of data.materials){if(!m||!/^local-[a-f0-9]{32}$/.test(m.id)||!/^data\/media\/[a-f0-9]{64}\.png$/.test(m.asset)||typeof m.name!=='string'||m.name.length>80||typeof m.source!=='string'||m.source.length>200||!['人物','物体','图形','界面','背景'].includes(m.category)||!Number.isInteger(m.width)||!Number.isInteger(m.height)||m.width<1||m.width>539||m.height<1||m.height>208)continue;if(!items.some(x=>x.id===m.id))items.push(m)}return items;
 })();userPromise.catch(()=>{userPromise=null});return userPromise;
}
function loadPack(name){
 if(g.MotionPrompt.packs[name])return Promise.resolve(g.MotionPrompt.packs[name]);
 if(pending.has(name))return pending.get(name);
 const promise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=name==='principles'?'assets/principles-pack.js':name==='cinema'?'assets/cinema-pack.js?v=20261101-eyes6':'packs/'+name+'/pack.js';s.onload=()=>g.MotionPrompt.packs[name]?resolve(g.MotionPrompt.packs[name]):reject(Error('素材来源加载失败'));s.onerror=()=>reject(Error('素材来源加载失败'));document.head.append(s)});
 pending.set(name,promise);promise.catch(()=>pending.delete(name));return promise;
}
async function render(item,canvas){
 canvas.width=item.width;canvas.height=item.height;let ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);
 if(item.asset){if(!/^data\/media\/[a-f0-9]{64}\.png$/.test(item.asset))throw Error('素材地址无效');let image=await new Promise((resolve,reject)=>{let image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(Error('无法读取已保存的素材'));image.src=item.asset});ctx.drawImage(image,0,0,canvas.width,canvas.height);return canvas;}
 const pack=await loadPack(item.pack),fn=pack.materials&&pack.materials[item.draw];if(typeof fn!=='function')throw Error('素材绘制函数不可用：'+item.name);
 ctx.save();try{fn(ctx,.8)}finally{ctx.restore()}return canvas;
}
for(const [id,name,draw,source,w,h] of [['lp2-stack-plan','堆叠卡片：计划','stackPlan','示例 #147',420,170],['lp2-stack-make','堆叠卡片：制作','stackMake','示例 #147',420,170],['lp2-stack-deliver','堆叠卡片：交付','stackDeliver','示例 #147',420,170],['lp2-spot-simple','聚光卡片：简单','spotSimple','示例 #154',187,156],['lp2-spot-safe','聚光卡片：安心','spotSafe','示例 #154',187,156],['lp2-spot-fast','聚光卡片：快','spotFast','示例 #154',187,156],['lp2-scroll-mouse','滚动提示鼠标','scrollMouse','示例 #167',256,256]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'lp2',width:w,height:h});
for(let i=0;i<10;i++) items.push({id:'lp2-countdown-digit-'+i,name:'倒计时数字牌 '+i,draw:'countdownDigit'+i,source:'示例 #164，静止界面素材',category:'界面',pack:'lp2',width:75,height:92});
for(const [id,name,draw,source,w,h] of [['photo-plan-rim','轮廓光布光示意','planRim','示例 #098',185,185],['photo-plan-split','侧光布光示意','planSplit','示例 #100',185,185],['photo-plan-rembrandt','伦勃朗光布光示意','planRembrandt','示例 #101',185,185],['photo-plan-butterfly','蝴蝶光布光示意','planButterfly','示例 #102',185,185],['photo-histogram-high','高调亮度直方图','histogramHigh','示例 #113',212,112],['photo-histogram-low','低调亮度直方图','histogramLow','示例 #114',212,112]]) items.push({id,name,draw,source:source+'，静止图示',category:'界面',pack:'photo',width:w,height:h});
for(const [id,name,draw,source,w,h] of [['camera2-pov-phone','主观镜头中的手机','povPhone','示例 #179',256,256],['camera2-pov-sleeve','主观镜头蓝色袖口','povSleeve','示例 #179',256,256],['camera2-watch-sleeve','手表特写蓝色衣袖','watchSleeve','示例 #185',539,208]]) items.push({id,name,draw,source:source+'，静止素材',category:'物体',pack:'camera2',width:w,height:h});
for(const [id,name,draw,category,source,w,h] of [['lp-sky','网页视差蓝天','parallaxSky','背景','示例 #073',511,208],['lp-sun','网页视差太阳','parallaxSun','物体','示例 #073',256,256],['lp-mountain-far','网页视差远山','parallaxFar','物体','示例 #073',511,208],['lp-mountain-near','网页视差近山','parallaxNear','物体','示例 #073',511,208],['lp-hotel-mountain','山间旅馆图卡','hoverMountain','界面','示例 #081',186,168],['lp-hotel-sea','海滨旅馆图卡','hoverSea','界面','示例 #081',186,168],['lp-hotel-stars','星星旅馆图卡','hoverStars','界面','示例 #081',186,168]]) items.push({id,name,draw,source:source+'，静止素材',category,pack:'lp',width:w,height:h});
for(const [id,name,draw,source] of [['motion-count-badge','黄色通知徽标','countBadge','示例 #001'],['motion-arrow-chip','增长向上箭头','upArrowChip','示例 #007']]) items.push({id,name,draw,source:source+'，静止图形',category:'图形',pack:'motion',width:256,height:256});
for(let set=0;set<2;set++) for(let i=0;i<7;i++) for(let col=0;col<2;col++) items.push({id:'motion-transition-drip-'+set+'-'+i+'-'+col,name:'液态转场液滴 '+(set+1)+'-'+(i+1)+'（'+(col?'珊瑚红':'蓝色')+'）',draw:'transitionDrip'+set+'-'+i+'-'+col,source:'示例 #019，独立原型，未包含合并滤镜',category:'图形',pack:'motion',width:256,height:256});
for(const [id,name,draw,category,w,h] of [['mask-sky','文字遮罩珊瑚色天空','maskSky','背景',539,208],['mask-sun','文字遮罩黄色太阳','maskSun','物体',256,256],['mask-sea','文字遮罩蓝色海面','maskSea','物体',539,208],['mask-waves','文字遮罩白色海浪','maskWaves','物体',539,208],['mask-boat','文字遮罩帆船','maskBoat','物体',256,256],['mask-cloud','文字遮罩白云','maskCloud','物体',256,256]]) items.push({id,name,draw,source:'示例 #133，静止图层',category,pack:'motion2',width:w,height:h});
for(const [i,label,source] of [[0,'逆光','示例 #097'],[1,'轮廓光','示例 #098'],[2,'剪影','示例 #099'],[3,'低照度布光','示例 #100–#102']]) for(const [prefix,part,category,w,h] of [['portraitVariant','场景背景','背景',539,208],['portraitBareVariant','空背景','背景',539,208],['treeVariant','树','物体',256,256],['lampVariant','街灯','物体',256,256],['buildingVariant','建筑','物体',256,256]]) items.push({id:'photo-'+prefix.toLowerCase()+'-'+i,name:label+part,draw:prefix+i,source:source+'，静止素材',category,pack:'photo',width:w,height:h});
items.push({id:'photo-back-glow',name:'逆光暖色薄雾',draw:'backGlow',source:'示例 #097，透明覆盖层',category:'物体',pack:'photo',width:539,height:208});
for(let i=0;i<6;i++) items.push({id:'photo-flare-ghost-'+i,name:'镜头眩光光斑 '+(i+1),draw:'flareGhost'+i,source:'示例 #109，独立半透明光斑',category:'物体',pack:'photo',width:256,height:256});
for(const [i,label,source] of [[0,'高调','示例 #113'],[1,'低调','示例 #114'],[2,'黑白','示例 #115'],[3,'双色调','示例 #116'],[4,'青橙色调','示例 #117']]) for(const [prefix,part,category,w,h] of [['landscapeBareFinish','空风景背景','背景',539,208],['landscapeTreeFinish','风景树木','物体',256,256],['landscapeHouseFinish','风景小屋','物体',256,256],['landscapeSunFinish','太阳','物体',256,256]]) items.push({id:'photo-'+prefix.toLowerCase()+'-'+i,name:label+part,draw:prefix+i,source:source+'，静止素材',category,pack:'photo',width:w,height:h});
for(const [id,name,draw,source,w,h] of [['lp2-back-top','返回顶部按钮','backToTop','示例 #151',256,256],['lp2-hotspot-fabric','背包面料提示气泡','hotspotFabric','示例 #163',180,100],['lp2-hotspot-pocket','背包口袋提示气泡','hotspotPocket','示例 #163',180,100]]) items.push({id,name,draw,source:source+'，静止素材',category:'界面',pack:'lp2',width:w,height:h});
for(const [id,name,draw,source,category,w,h] of [['follow-body','跟随动画角色身体','followBody','示例 #122','人物',256,256],['follow-tail','跟随动画角色尾巴','followTail','示例 #122','物体',256,256],['follow-flag','跟随动画角色小旗','followFlag','示例 #122','物体',256,256],['paper-picture-coral','翻页珊瑚红图画','paperPictureCoral','示例 #140','图形',240,196],['paper-picture-mint','翻页薄荷绿图画','paperPictureMint','示例 #140','图形',240,196]]) items.push({id,name,draw,source:source+'，静止素材',category,pack:'motion2',width:w,height:h});
for(const [id,name,draw,source,category,w,h] of [['lp-compare-before','调整前的黑白山景','compareBefore','示例 #087','背景',399,180],['lp-compare-handle','前后对比滑块把手','compareHandle','示例 #087','界面',256,256],['lp-offer-popup','优惠提示弹窗','offerPopup','示例 #088','界面',300,172]]) items.push({id,name,draw,source:source+'，静止素材',category,pack:'lp',width:w,height:h});
for(let i=0;i<3;i++) for(const [prefix,label,source,height] of [['reasonCard','理由图卡','示例 #074',146],['featureCard','特点图卡','示例 #075',160]]) items.push({id:'lp-'+prefix.toLowerCase()+'-'+i,name:label+'：'+['蓝色山景','暖色山景','夜色山景'][i],draw:prefix+i,source:source+'，静止界面素材',category:'界面',pack:'lp',width:176,height});
for(const [id,name,draw,source,w,h] of [['lp2-field-empty','浮动标签输入框：空','floatingFieldEmpty','示例 #158',340,100],['lp2-field-filled','浮动标签输入框：填写','floatingFieldFilled','示例 #158',340,100],['lp2-field-error','输入框：格式无效','validationError','示例 #159',340,120],['lp2-field-success','输入框：格式正确','validationSuccess','示例 #159',340,120]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'lp2',width:w,height:h});
for(const [id,name,draw,source,category,w,h] of [['arrow-block-left','向左箭头方块','arrowBlockLeft','示例 #121','物体',256,256],['follow-character-left','向左的跟随角色','followCharacterLeft','示例 #122','人物',256,256],['follow-body-left','向左的角色身体','followBodyLeft','示例 #122','人物',256,256],['follow-tail-left','向左角色尾巴','followTailLeft','示例 #122','物体',256,256],['follow-flag-left','向左角色小旗','followFlagLeft','示例 #122','物体',256,256],['motion-path-dots','纸飞机虚线轨迹','motionPath','示例 #126','图形',539,208],['stop-film-frame','定格动画胶片边框','filmFrame','示例 #128','图形',539,208]]) items.push({id,name,draw,source:source+'，静止素材',category,pack:'motion2',width:w,height:h});
for(const [id,name,draw,source,category,w,h] of [['burst-heart-outline','点赞空心爱心','burstHeartOutline','示例 #003','图形',256,256],['type-input-base','打字输入框底板','typeInputBase','示例 #006','界面',511,132],['type-send-off','发送按钮：未激活','typeSendOff','示例 #006','界面',256,256],['type-send-on','发送按钮：激活','typeSendOn','示例 #006','界面',256,256],['reveal-hello','遮罩标题：你好','revealHello','示例 #005','图形',539,140],['reveal-subtitle','遮罩副标题：很高兴认识你','revealSubtitle','示例 #005','图形',539,90]]) items.push({id,name,draw,source:source+'，静止素材',category,pack:'motion',width:w,height:h});
for(const [id,name,draw] of [['kinetic-stretch','动态排版文字：拉伸','kineticStretch'],['kinetic-bounce','动态排版文字：弹跳','kineticBounce'],['kinetic-rotate','动态排版文字：旋转','kineticRotate'],['kinetic-impact','动态排版文字：砰','kineticImpact']]) items.push({id,name,draw,source:'示例 #008，静止文字图形',category:'图形',pack:'motion',width:539,height:208});
for(const [id,name,draw,source] of [['weight-thin','细字重：运动','weightThin','示例 #132'],['weight-bold','粗字重：运动','weightBold','示例 #132'],['wave-title','波浪文字标题','waveTitle','示例 #130'],['masked-ocean-text','海景文字遮罩','maskedOceanText','示例 #133']]) items.push({id,name,draw,source:source+'，静止文字图形',category:'图形',pack:'motion2',width:539,height:208});
for(const [id,name,draw,source] of [['scramble-hello','文字乱码：你好新世界','scrambleHello','示例 #129'],['scramble-forward','文字乱码：一起向前行','scrambleForward','示例 #129'],['text-path-guide','沿线文字虚线路径','textPathGuide','示例 #131'],['text-on-path','沿线文字','textOnPath','示例 #131']]) items.push({id,name,draw,source:source+'，静止图形',category:'图形',pack:'motion2',width:539,height:208});
for(let i=2;i<6;i++) items.push({id:'boil-accent-'+i,name:'手绘线条装饰 '+(i-1),draw:'boilAccent'+i,source:'示例 #136，独立线条',category:'图形',pack:'motion2',width:256,height:256});
for(const [id,name,draw,source] of [['camera-audience-blue','欢呼观众：深蓝','audienceBlue','示例 #189'],['camera-audience-light','欢呼观众：浅蓝','audienceLightBlue','示例 #189'],['camera-morph-pose-one','变形剪辑人物姿势一','morphPoseOne','示例 #186'],['camera-morph-pose-two','变形剪辑人物姿势二','morphPoseTwo','示例 #186']]) items.push({id,name,draw,source:source+'，静止人物',category:'人物',pack:'camera2',width:256,height:256});
for(const [id,name,draw] of [['bounce-squashed','弹跳角色：挤压','bounceSquashed'],['bounce-stretched','弹跳角色：拉伸','bounceStretched']]) items.push({id,name,draw,source:'示例 #011，静止人物姿态',category:'人物',pack:'motion',width:256,height:256});
for(let i=1;i<=15;i++) items.push({id:'trail-dot-'+i,name:'运动拖尾光点 '+String(i).padStart(2,'0'),draw:'trailDot'+i,source:'示例 #014，独立半透明光点',category:'图形',pack:'motion',width:256,height:256});
for(const [id,name,draw,source] of [['zoom-title','穿越缩放文字 ZOOM','zoomTitle','示例 #020'],['go-title','穿越缩放文字 GO','goTitle','示例 #020'],['fault-title','故障文字','faultTitle','示例 #023'],['day-title','转场文字：白天','dayTitle','示例 #017–#019'],['night-title','转场文字：夜晚','nightTitle','示例 #017–#019']]) items.push({id,name,draw,source:source+'，静止文字图形',category:'图形',pack:'motion',width:539,height:208});
for(let i=0;i<4;i++) items.push({id:'impact-box-'+i,name:'冲击画面背景装饰 '+(i+1),draw:'impactBox'+i,source:'示例 #024，独立图形',category:'物体',pack:'motion',width:256,height:256});
items.push({id:'photo-fisheye-empty',name:'鱼眼镜头空街道',draw:'fisheyeEmpty',source:'示例 #110，最大鱼眼效果静帧',category:'背景',pack:'photo',width:539,height:208});
items.push({id:'photo-fisheye-person',name:'鱼眼镜头人物',draw:'fisheyePerson',source:'示例 #110，最大鱼眼效果静帧',category:'人物',pack:'photo',width:539,height:208});
for(const [part,label,indices] of [['Building','楼房',[1,2,3,4,5,6,7]],['Tree','树木',[0,1,2]],['Lamp','街灯',[0,1]]]) for(const i of indices) items.push({id:'photo-fisheye-'+part.toLowerCase()+'-'+i,name:'鱼眼镜头'+label+' '+(i+1),draw:'fisheye'+part+i,source:'示例 #110，最大鱼眼效果静帧',category:'物体',pack:'photo',width:539,height:208});
for(const [id,name,draw,source] of [['photo-panning-background','追随拍摄模糊空街道','panningBackground','示例 #108'],['photo-bokeh-background','散景模糊空街道','bokehBackground','示例 #105']]) items.push({id,name,draw,source:source+'，人物和车辆已分离',category:'背景',pack:'photo',width:539,height:208});
for(const [id,name,draw,source,w,h] of [['timeline-node-off','时间线节点：未到达','timelineNodeOff','示例 #145',256,256],['timeline-node-on','时间线节点：已到达','timelineNodeOn','示例 #145',256,256],['send-idle','发送按钮','sendIdle','示例 #160',256,90],['send-loading','发送按钮：加载中','sendLoading','示例 #160',256,90],['send-done','发送按钮：已完成','sendDone','示例 #160',256,90]]) items.push({id,name,draw,source:source+'，静止界面状态',category:'界面',pack:'lp2',width:w,height:h});
for(const [id,name,draw,source,w,h] of [['filter-result-blue','筛选结果卡：蓝','filterResultBlue','示例 #061',282,94],['filter-result-grey','筛选结果卡：灰','filterResultGrey','示例 #061',282,94],['range-track-full','范围滑块轨道：宽范围','rangeTrackFull','示例 #062',474,70],['range-track-middle','范围滑块轨道：中间范围','rangeTrackMiddle','示例 #062',474,70]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'ui',width:w,height:h});
for(let row=0;row<3;row++) for(let i=0;i<7;i++) items.push({id:'ui-chart-column-'+row+'-'+i,name:'分段图表柱：'+['日','周','月'][row]+' '+(i+1),draw:'chartColumn'+row+'-'+i,source:'示例 #060，独立静态柱形',category:'图形',pack:'ui',width:256,height:256});
for(const [id,name,draw,source,w,h] of [['lp-magnetic-button','磁吸按钮：联系我们','magneticButton','示例 #084',256,110],['lp-ripple-button','涟漪按钮：发送','rippleButton','示例 #085',320,96],['lp-smooth-price-0','网页价格卡：免费','smoothPrice0','示例 #093',165,136],['lp-smooth-price-1','网页价格卡：980','smoothPrice1','示例 #093',165,136],['lp-smooth-price-2','网页价格卡：2980','smoothPrice2','示例 #093',165,136]]) items.push({id,name,draw,source:source+'，静止界面素材',category:'界面',pack:'lp',width:w,height:h});
for(let i=0;i<16;i++) items.push({id:'parallax-star-'+i,name:'视差夜空星点 '+String(i+1).padStart(2,'0'),draw:'parallaxStar'+i,source:'示例 #016，独立星点',category:'物体',pack:'motion',width:256,height:256});
for(let i=0;i<9;i++) items.push({id:'parallax-tree-'+i,name:'视差山景树木 '+String(i+1).padStart(2,'0'),draw:'parallaxTree'+i,source:'示例 #016，独立树木',category:'物体',pack:'motion',width:256,height:256});
for(let i=0;i<3;i++) items.push({id:'parallax-foliage-piece-'+i,name:'视差前景暗影 '+(i+1),draw:'parallaxFoliagePiece'+i,source:'示例 #016，独立暗影形状',category:'物体',pack:'motion',width:256,height:256});
for(const [id,name,draw,category,w,h] of [['camera-top-road','鸟瞰道路和网格','topRoad','背景',539,208],['camera-top-building-wide','鸟瞰宽楼房','topBuildingWide','物体',256,256],['camera-top-building-small','鸟瞰小楼房','topBuildingSmall','物体',256,256]]) items.push({id,name,draw,source:'示例 #181，静止场景素材',category,pack:'camera2',width:w,height:h});
for(const [id,name,draw] of [['mountain-complete-left','完整绿色山峰','mountainPeakCompleteLeft'],['mountain-complete-center','完整深蓝雪山','mountainPeakCompleteCenter'],['mountain-complete-right','完整蓝色雪山','mountainPeakCompleteRight']]) items.push({id,name,draw,source:'示例 #137、#142，完整矢量山峰',category:'物体',pack:'motion2',width:256,height:256});
for(const [id,name,draw,category,w,h] of [['photo-blue-hour-bg','蓝调时刻远山背景','blueHourBackdrop','背景',539,208],['photo-blue-hour-glow','蓝调时刻街灯光晕','blueHourLampGlow','物体',256,256]]) items.push({id,name,draw,source:'示例 #104，静止素材',category,pack:'photo',width:w,height:h});
for(const [id,name,draw] of [['camera-establishing-bg','城市定场背景','establishingBackdrop'],['camera-establishing-bare','城市定场空山景','establishingBare']]) items.push({id,name,draw,source:'示例 #183，人物已分离的静帧',category:'背景',pack:'camera2',width:539,height:208});
items.push({id:'photo-tilt-empty',name:'移轴效果空街道',draw:'tiltShiftEmpty',source:'示例 #106，模糊空背景',category:'背景',pack:'photo',width:539,height:208});
items.push({id:'photo-chromatic-empty',name:'色差效果空街道',draw:'chromaticEmpty',source:'示例 #111，无人物静帧',category:'背景',pack:'photo',width:539,height:208});
items.push({id:'photo-chromatic-person',name:'色差效果人物',draw:'chromaticPerson',source:'示例 #111，独立重绘近似静帧，叠加效果受底图影响',category:'人物',pack:'photo',width:539,height:208});
items.push({id:'lp2-website-header',name:'网页导航页头',draw:'websiteHeader',source:'示例 #149，静止界面素材',category:'界面',pack:'lp2',width:511,height:54});
for(let i=0;i<3;i++) items.push({id:'lp2-reveal-line-'+i,name:'逐字显现文字：'+['日常微小用心累积','一点一滴改变生活','让每一天更有意义'][i],draw:'revealLine'+i,source:'示例 #146，静止文字图形',category:'图形',pack:'lp2',width:300,height:65});
for(let i=0;i<4;i++) items.push({id:'lp2-scroll-toc-'+i,name:'滚动目录：'+['简介','如何使用','费用','常见问题'][i],draw:'scrollToc'+i,source:'示例 #150，静止界面素材',category:'界面',pack:'lp2',width:170,height:208});
for(let i=0;i<3;i++) for(let active=0;active<2;active++) items.push({id:'lp2-roll-label-'+i+'-'+active,name:'文字菜单：'+['作品','关于','联系'][i]+(active?'（强调）':''),draw:'rollLabel'+i+'-'+active,source:'示例 #156，静止文字图形',category:'图形',pack:'lp2',width:140,height:75});
for(let i=0;i<4;i++) items.push({id:'lp-portfolio-card-'+i,name:'横向作品图卡 '+String(i+1).padStart(2,'0'),draw:'portfolioCard'+i,source:'示例 #077，静止图卡',category:'界面',pack:'lp',width:240,height:170});
for(let i=1;i<=4;i++) items.push({id:'lp-scroll-progress-'+i,name:'滚动进度条 '+(i*25)+'%',draw:'scrollProgress'+i,source:'示例 #079，静止状态',category:'界面',pack:'lp',width:511,height:26});
items.push({id:'lp-follower-dot',name:'光标跟随圆点',draw:'followerDot',source:'示例 #083，静止素材',category:'图形',pack:'lp',width:256,height:256});
for(let i=0;i<3;i++) for(let active=0;active<2;active++) items.push({id:'lp-underline-link-'+i+'-'+active,name:'导航文字：'+['服务','成就','公司简介'][i]+(active?'（带下划线）':''),draw:'underlineLink'+i+'-'+active,source:'示例 #086，静止文字',category:'图形',pack:'lp',width:160,height:75});
for(const [id,name,draw] of [['lp-highlight-minutes','高亮文字：只需 10 分钟','highlightMinutes'],['lp-highlight-recipe','高亮文字：不会失败的食谱','highlightRecipe']]) items.push({id,name,draw,source:'示例 #080，静止文字图形',category:'图形',pack:'lp',width:260,height:70});
for(const [id,name,draw] of [['lp-preloader-half','预加载：50%','preloaderHalf'],['lp-preloader-full','预加载：100%','preloaderFull']]) items.push({id,name,draw,source:'示例 #089，静止界面图层',category:'界面',pack:'lp',width:511,height:168});
items.push({id:'lp-preloader-background',name:'预加载深色背景',draw:'preloaderBackground',source:'示例 #089，空背景',category:'背景',pack:'lp',width:511,height:168});
for(let i=0;i<3;i++) items.push({id:'lp-infinite-row-'+i,name:'无限滚动列表行 '+(i+1),draw:'infiniteRow'+i,source:'示例 #091，静止界面素材',category:'界面',pack:'lp',width:371,height:84});
for(let i=0;i<4;i++) items.push({id:'lp-marquee-word-'+i,name:'跑马灯文字：'+['网页设计','品牌设计','动态设计','界面体验'][i],draw:'marqueeWord'+i,source:'示例 #094，静止文字图形',category:'图形',pack:'lp',width:200,height:80});
for(const [id,name,draw] of [['lp-snap-light','滚动吸附浅色画面','snapSectionLight'],['lp-snap-dark','滚动吸附深色画面','snapSectionDark']]) items.push({id,name,draw,source:'示例 #078，静止背景画面',category:'背景',pack:'lp',width:511,height:168});
for(let i=1;i<=3;i++) items.push({id:'lp-pin-step-'+i,name:'固定段落步骤编号 0'+i,draw:'pinStep'+i,source:'示例 #076，静止文字图形',category:'图形',pack:'lp',width:256,height:110});
for(let tone=0;tone<2;tone++) for(let i=0;i<10;i++) items.push({id:'photo-street-building-'+tone+'-'+i,name:'摄影街道'+(tone?'夜景':'日间')+'楼房 '+String(i+1).padStart(2,'0'),draw:'streetBuilding'+tone+'-'+i,source:'示例 #105–#111，共用楼房原型',category:'物体',pack:'photo',width:256,height:256});
for(const [tone,label,source] of [[0,'日间','示例 #097–#104'],[1,'蓝调夜景','示例 #104'],[2,'逆光','示例 #097'],[3,'轮廓光','示例 #098'],[4,'剪影','示例 #099'],[5,'布光','示例 #100–#102'],[6,'黄金时刻','示例 #103']]) for(let i=0;i<2;i++) items.push({id:'photo-portrait-building-'+tone+'-'+i,name:label+'远景楼房 '+(i+1),draw:'portraitBuilding'+tone+'-'+i,source:source+'，独立楼房原型',category:'物体',pack:'photo',width:256,height:256});
for(let i=0;i<2;i++) items.push({id:'phone-lens-'+i,name:'分解手机镜头 '+(i+1),draw:'phoneLens'+i,source:'示例 #143，独立镜头',category:'物体',pack:'motion2',width:256,height:256});
items.push({id:'phone-battery-mark',name:'分解手机电池标记',draw:'phoneBatteryMark',source:'示例 #143，独立图形',category:'图形',pack:'motion2',width:256,height:256});
for(let i=0;i<3;i++) items.push({id:'phone-chip-'+i,name:'分解手机芯片 '+(i+1),draw:'phoneChip'+i,source:'示例 #143，独立芯片',category:'物体',pack:'motion2',width:256,height:256});
for(let i=0;i<2;i++) items.push({id:'phone-track-'+i,name:'分解手机电路线 '+(i+1),draw:'phoneTrack'+i,source:'示例 #143，独立线路',category:'图形',pack:'motion2',width:256,height:256});
for(let i=0;i<6;i++) items.push({id:'phone-app-'+i,name:'分解手机屏幕图标 '+(i+1),draw:'phoneApp'+i,source:'示例 #143，独立屏幕图标',category:'界面',pack:'motion2',width:256,height:256});
for(const [id,name,draw] of [['tee-plain-white-front','白色空白 T 恤正面','teeWhitePlainFront'],['tee-plain-white-back','白色空白 T 恤背面','teeWhitePlainBack'],['tee-plain-orange-front','橙色空白 T 恤正面','teeOrangePlainFront'],['tee-plain-orange-back','橙色空白 T 恤背面','teeOrangePlainBack'],['tee-dot-blue','T 恤蓝色圆点标记','teeDotBlue'],['tee-dot-white','T 恤白色圆点标记','teeDotWhite'],['tee-star-blue','T 恤蓝色星形标记','teeStarBlue'],['tee-star-white','T 恤白色星形标记','teeStarWhite']]) items.push({id,name,draw,source:'示例 #155，独立服装素材',category:'物体',pack:'lp2',width:256,height:256});
for(const [part,label] of [['Handle','提手'],['Shell','主体'],['Pocket','前袋'],['Zipper','拉链'],['Tag','标签']]) items.push({id:'bag-'+part.toLowerCase(),name:'旅行背包：'+label,draw:'bag'+part,source:'示例 #163，相同画布坐标可叠合',category:'物体',pack:'lp2',width:256,height:256});
for(const [id,name,draw,source] of [['sailboat-sail','帆船：白色船帆','sailboatSail','示例 #137、#144'],['sailboat-hull','帆船：船身','sailboatHull','示例 #137、#144'],['windmill-tower','风车：塔身','windmillTower','示例 #141、#144'],['windmill-hub','风车：中心','windmillHub','示例 #141、#144'],['city-window-lit','夜城：亮窗','cityWindowLit','示例 #141、#144'],['city-window-dark','夜城：暗窗','cityWindowDark','示例 #141、#144']]) items.push({id,name,draw,source:source+'，独立部件',category:'物体',pack:'motion2',width:256,height:256});
for(let i=0;i<4;i++) items.push({id:'windmill-blade-'+i,name:'风车：叶片 '+(i+1),draw:'windmillBlade'+i,source:'示例 #141、#144，相同画布坐标可叠合',category:'物体',pack:'motion2',width:256,height:256});
items.push({id:'photo-exposure-car',name:'长曝光夜景汽车原型',draw:'nightExposureCar',source:'示例 #107，未降低透明度的汽车',category:'物体',pack:'photo',width:256,height:256});
for(let tone=0;tone<2;tone++) for(let i=0;i<10;i++) items.push({id:'photo-car-part-'+tone+'-'+i,name:(tone?'夜景汽车：':'日间汽车：')+['车顶','左窗','右窗','车身','前灯','尾灯','左轮','右轮','左轮毂','右轮毂'][i],draw:'photoCarPart'+tone+'-'+i,source:(tone?'示例 #107':'示例 #106、#108')+'，相同画布坐标可叠合',category:'物体',pack:'photo',width:256,height:256});
for(let i=0;i<6;i++) items.push({id:'camera-blue-car-part-'+i,name:'镜头蓝车：'+['车身','车顶','左窗','右窗','左轮','右轮'][i],draw:'cameraBlueCarPart'+i,source:'示例 #187–#190，相同画布坐标可叠合',category:'物体',pack:'camera2',width:256,height:256});
for(const i of [0,1,4,5]) items.push({id:'camera-grey-car-part-'+i,name:'镜头灰车：'+['车身','车顶','','','左轮','右轮'][i],draw:'cameraGreyCarPart'+i,source:'示例 #175，相同画布坐标可叠合',category:'物体',pack:'camera2',width:256,height:256});
for(const [id,name,draw] of [['watch-dial','手表：表盘','watchDial'],['watch-hands','手表：时针与分针','watchHands'],['watch-second','手表：秒针','watchSecond']]) items.push({id,name,draw,source:'示例 #185，相同画布坐标可叠合',category:'物体',pack:'camera2',width:256,height:256});
for(const [id,name,draw] of [['flower-stem','镜头小花：花茎','flowerStem'],['flower-center','镜头小花：花心','flowerCenter']]) items.push({id,name,draw,source:'示例 #033、#182，相同画布坐标可叠合',category:'物体',pack:'camera2',width:256,height:256});
for(let i=0;i<6;i++) items.push({id:'flower-petal-'+i,name:'镜头小花：花瓣 '+(i+1),draw:'flowerPetal'+i,source:'示例 #033、#182，相同画布坐标可叠合',category:'物体',pack:'camera2',width:256,height:256});
for(let tone=0;tone<2;tone++) for(let i=0;i<9;i++) items.push({id:'camera-person-part-'+tone+'-'+i,name:(tone?'浅蓝人物：':'蓝色人物：')+['左腿','右腿','左臂自然','右臂自然','左臂举起','右臂举起','身体','头部','眼睛'][i],draw:'personPart'+tone+'-'+i,source:'镜头人物与示例 #189，共用静态原型，相同画布坐标可叠合',category:'人物',pack:'camera2',width:256,height:256});
for(const [kind,label,count,source] of [['standard','镜头常规楼房',8,'镜头共用城市场景'],['city','镜头城市楼房',8,'示例 #183、#187–#190'],['hyperlapse','移动延时楼房',12,'示例 #171']]) for(let i=0;i<count;i++) items.push({id:'camera-building-'+kind+'-'+i,name:label+' '+String(i+1).padStart(2,'0'),draw:'cameraBuilding-'+kind+'-'+i,source:source+'，独立楼房原型',category:'物体',pack:'camera2',width:256,height:256});
for(const [tone,label,source] of [[0,'日间','示例 #105–#107、#109–#110'],[1,'夜景','示例 #107'],[2,'黑白','示例 #115'],[3,'双色调','示例 #116'],[4,'青橙色调','示例 #117']]) for(let i=0;i<6;i++) items.push({id:'photo-person-part-'+tone+'-'+i,name:label+'摄影人物：'+['左腿','右腿','左臂','右臂','身体','头部'][i],draw:'photoPersonPart'+tone+'-'+i,source:source+'，相同画布坐标可叠合',category:'人物',pack:'photo',width:256,height:256});
for(const [id,name,draw,source,w,h] of [['hotspot-core','图片热点中心','hotspotCore','示例 #163',256,256],['like-outline','点赞空心爱心','likeOutline','示例 #166',256,256],['player-badge','视频播放状态条','playerBadge','示例 #168',192,88],['player-pause','视频暂停图标','playerPause','示例 #168',256,256],['player-mute','视频静音图标','playerMute','示例 #168',256,256],['lightbox-close','灯箱关闭图标','lightboxClose','示例 #162',256,256],['lightbox-prev','灯箱上一张图标','lightboxPrev','示例 #162',256,256],['lightbox-next','灯箱下一张图标','lightboxNext','示例 #162',256,256]]) items.push({id,name,draw,source:source+'，独立静态图形',category:'界面',pack:'lp2',width:w,height:h});
function blob(canvas){return new Promise((resolve,reject)=>canvas.toBlob(x=>x?resolve(x):reject(Error('无法生成 PNG')),'image/png'))}
async function makeBlob(id){let item=items.find(x=>x.id===id);if(!item)throw Error('找不到素材');return blob(await render(item,document.createElement('canvas')))}
async function download(item){let b=await makeBlob(item.id),url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=item.name+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)}
function sourceMatchesExample(source,query){
 const m=/^#?(\d{1,3})$/.exec(query); if(!m)return false;
 const id=Number(m[1]); if(id<1||id>192)return false;
 for(const match of source.matchAll(/#(\d{3})(?:[–—-]#?(\d{3}))?/g)) {
  const start=Number(match[1]),end=match[2]?Number(match[2]):start;
  if(id>=start&&id<=end)return true;
 }
 return false;
}
// Subcategories are a view of the existing catalogue; no saved item is rewritten.
const taxonomy={
 '人物':['身体与动作部件','完整人物','创意角色','其他人物'],
 '物体':['玻璃碎片','车辆与交通','建筑与设施','植物与自然','服装与随身物品','设备与零件','场景图层与效果','其他物体'],
 '图形':['玻璃与裂纹','粒子与液态','光影与摄影效果','文字与排版','几何与装饰','其他图形'],
 '界面':['卡片与弹窗','导航与菜单','按钮与输入控件','提示与状态','图标与图示','其他界面'],
 '背景':['摄影与街景','自然风景','天空与纯色','网页与图文场景','其他背景']
};
function classify(item){
 const t=(item.id+' '+item.name).toLowerCase();
 if(item.category==='人物'){
  if(/person-part|身体|头部|左腿|右腿|左臂|右臂|手臂|手掌|手部|手指|袖口|pov-arm/.test(t))return '身体与动作部件';
  if(/person|bust|人物|行人|观众|睡眠|睡觉|特写|肖像/.test(t))return '完整人物';
  if(/bounce|follow|角色|小人|小球/.test(t))return '创意角色';
  return '其他人物';
 }
 if(item.category==='物体'){
  if(/glass|玻璃|碎片/.test(t))return '玻璃碎片';
  if(/(?:^|[- ])car(?:[- ]|$)|vehicle|sailboat|汽车|车辆|车身|车顶|车轮|轮毂|车灯|帆船|船帆|船身|飞机/.test(t))return '车辆与交通';
  if(/building|windmill|楼房|建筑|房屋|房子|小屋|风车|路灯|街灯|路桩|演讲台|窗户|城墙/.test(t))return '建筑与设施';
  if(/tee-|bag-|backpack|服装|衣服|t 恤|背包|旅行包|帽子/.test(t))return '服装与随身物品';
  if(/tree|flower|plant|树|花|植物|草|山峰|山丘|雪山|山层|远山|近山|云|太阳|月亮|白月|海浪|海面|岩石|飘叶|星点/.test(t))return '植物与自然';
  if(/phone|watch|手机|手表|相机|摄影机|芯片|电池|三脚架|设备|仪表盘/.test(t))return '设备与零件';
  if(/layer|光晕|光斑|眩光|漏光|光束|水滴|液滴|主滴|图层|地面|网格|墙|前景/.test(t))return '场景图层与效果';
  return '其他物体';
 }
 if(item.category==='图形'){
  if(/glass|玻璃|裂纹|碎片/.test(t))return '玻璃与裂纹';
  if(/particle|droplet|drip|liquid|粒子|水滴|液滴|液态|液体|拖尾/.test(t))return '粒子与液态';
  if(/bokeh|flare|散景|漏光|眩光|光晕|颗粒|暗角|光线|光影/.test(t))return '光影与摄影效果';
  if(/text|word|label|文字|字母|数字|标题|文案|标语|字重|编号/.test(t))return '文字与排版';
  if(/shape|kaleido|几何|万花筒|圆|方|三角|星|爱心|线条|图形|装饰|图表|坐标|箭头|胶囊|图画|色带|标记|轨迹/.test(t))return '几何与装饰';
  return '其他图形';
 }
 if(item.category==='界面'){
  if(/图标|图示|手指|布光示意|直方图/.test(t))return '图标与图示';
  if(/card|modal|popup|lightbox|卡片|图卡|价格卡|弹窗|面板|气泡|抽屉|对话框/.test(t))return '卡片与弹窗';
  if(/nav|menu|pagination|导航|菜单|分页|目录|步骤/.test(t))return '导航与菜单';
  if(/button|slider|switch|input|dropdown|按钮|开关|输入|滑块|滑轨|筛选|标签|下拉|步进|分段/.test(t))return '按钮与输入控件';
  if(/progress|skeleton|loading|badge|加载|进度|通知|徽标|状态|骨架|热点|倒计时|提示|时间线/.test(t))return '提示与状态';
  if(/icon|图标|图示|手指/.test(t))return '图标与图示';
  return '其他界面';
 }
 if(item.category==='背景'){
  if(/photo|摄影|街景|街道|黑白|色调|曝光/.test(t))return '摄影与街景';
  if(/sky|天空|蓝天|夜空|纯色|渐变|空背景/.test(t))return '天空与纯色';
  if(/mountain|sea|field|山|海|田野|风景|湖|自然|草原/.test(t))return '自然风景';
  if(/website|网页|页面|图文|文字画面|含文字|翻页|滚动|预加载/.test(t))return '网页与图文场景';
  return '其他背景';
 }
 return '其他';
}
function build(container,{onUse,onAddLayer,onSetBackground}={}){
 container.textContent='';const bar=document.createElement('div');bar.className='material-filter';
 const search=document.createElement('input');search.type='search';search.placeholder='搜索人物、树、背景…';search.setAttribute('aria-label','搜索素材');
 const category=document.createElement('select');category.setAttribute('aria-label','素材分类');['全部','人物','物体','图形','界面','背景'].forEach(x=>category.add(new Option(x,x)));
 const subcategory=document.createElement('select');subcategory.setAttribute('aria-label','素材细分');
 const origin=document.createElement('select');origin.setAttribute('aria-label','素材来源');[['全部来源','全部'],['网站素材','网站素材'],['自选素材','自选素材']].forEach(([label,value])=>origin.add(new Option(label,value)));
 const clear=document.createElement('button');clear.type='button';clear.className='secondary';clear.textContent='清除筛选';
 const refresh=document.createElement('button');refresh.type='button';refresh.className='secondary';refresh.textContent='刷新自选素材';const count=document.createElement('span');count.setAttribute('role','status');bar.append(search,category,subcategory,origin,clear,refresh,count);
 const groupsElement=document.createElement('div');groupsElement.className='material-groups';const empty=document.createElement('p');empty.className='material-empty';empty.textContent='没有找到符合条件的素材，请调整搜索或筛选条件。';empty.hidden=true;container.append(bar,empty,groupsElement);
 const groups=new Map();let cards=[];
 function groupFor(item){
  const sub=classify(item),key=item.category+'|'+sub;if(groups.has(key))return groups.get(key);
  const section=document.createElement('section');section.className='material-group';const heading=document.createElement('h3');heading.className='material-group-heading';const title=document.createElement('span');title.textContent=item.category+' / '+sub;const total=document.createElement('span');total.className='material-group-count';heading.append(title,total);const grid=document.createElement('div');grid.className='material-grid';section.append(heading,grid);
  const group={key,category:item.category,sub,section,total,grid};groups.set(key,group);
  const order=(x)=>Object.keys(taxonomy).indexOf(x.category)*100+(taxonomy[x.category]||[]).indexOf(x.sub);
  const next=[...groups.values()].filter(x=>x!==group&&order(x)>order(group)).sort((a,b)=>order(a)-order(b))[0];groupsElement.insertBefore(section,next?next.section:null);return group;
 }
 function addCard(item){
  const card=document.createElement('article');card.className='material-card';const canvas=document.createElement('canvas');canvas.setAttribute('aria-label',item.name+' 素材预览');
  const preview=document.createElement('div');preview.className='material-preview';preview.append(canvas);
  const title=document.createElement('strong');title.textContent=item.name;
  const meta=document.createElement('p');meta.textContent=item.category+' · '+item.source;
  const actions=document.createElement('div');actions.className='material-actions';const save=document.createElement('button');save.type='button';save.className='secondary';save.textContent='下载 PNG';save.addEventListener('click',()=>download(item).catch(e=>alert(e.message)));
  const use=document.createElement(onUse?'button':'a');if(onUse){use.type='button';use.addEventListener('click',()=>onUse(item))}else use.href='editor.html?material='+encodeURIComponent(item.id);use.className='material-use';use.textContent=onUse?'设为主素材':'用它创建动态';
  actions.append(save,use);if(onAddLayer){const add=document.createElement('button');add.type='button';add.className='secondary';add.textContent='＋图层';add.addEventListener('click',()=>onAddLayer(item));actions.append(add);}if(item.category==='背景'){let bg=document.createElement(onSetBackground?'button':'a');if(onSetBackground){bg.type='button';bg.addEventListener('click',()=>onSetBackground(item))}else bg.href='editor.html?background='+encodeURIComponent(item.id);bg.className='secondary';bg.textContent=onSetBackground?'设为背景':'用作背景创建';actions.append(bg);}card.append(preview,title,meta,actions);const group=groupFor(item);group.grid.append(card);cards.push({card,item,group});render(item,canvas).catch(e=>{meta.textContent='素材加载失败：'+e.message});
 }
 items.forEach(addCard);
 function updateSubcategories(){const previous=subcategory.value;subcategory.textContent='';subcategory.add(new Option('全部细分','全部'));for(const [cat,subs] of Object.entries(taxonomy)){if(category.value!=='全部'&&category.value!==cat)continue;for(const sub of subs){const key=cat+'|'+sub;if(groups.has(key))subcategory.add(new Option(category.value==='全部'?cat+' / '+sub:sub,key));}}subcategory.value=[...subcategory.options].some(o=>o.value===previous)?previous:'全部';}
 function filter(){const q=search.value.trim().toLowerCase(),c=category.value,s=subcategory.value,o=origin.value;let n=0;const totals=new Map();cards.forEach(({card,item,group})=>{const own=!!item.asset;const ok=(c==='全部'||c===item.category)&&(s==='全部'||s===group.key)&&(o==='全部'||(o==='自选素材')===own)&&(!q||(item.name+' '+item.source+' '+item.id+' '+group.sub).toLowerCase().includes(q)||sourceMatchesExample(item.source,q));card.hidden=!ok;if(ok){n++;totals.set(group.key,(totals.get(group.key)||0)+1)}});groups.forEach(group=>{const total=totals.get(group.key)||0;group.section.hidden=!total;group.total.textContent=total+' 项'});empty.hidden=n!==0;count.textContent='共 '+n+' 个素材'}
 search.addEventListener('input',filter);category.addEventListener('change',()=>{updateSubcategories();filter()});subcategory.addEventListener('change',filter);origin.addEventListener('change',filter);clear.addEventListener('click',()=>{search.value='';category.value='全部';origin.value='全部';subcategory.value='全部';updateSubcategories();filter()});updateSubcategories();filter();
 function syncUser(force=false){refresh.disabled=true;loadUser(force).then(()=>{let existing=new Set(cards.map(c=>c.item.id));items.filter(item=>!existing.has(item.id)).forEach(addCard);updateSubcategories();filter()}).catch(()=>{filter();count.textContent+=' · 自选素材读取失败'}).finally(()=>{refresh.disabled=false})}refresh.addEventListener('click',()=>syncUser(true));syncUser();
}
g.MPMaterials={items,render,makeBlob,download,build,loadUser,loadPack,taxonomy,classify};
})(window);
