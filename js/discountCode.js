
(function () {
	function setDiscountApiEndpoint(type) {
		var endpointURL = {};
		var env = ApiEndpointConfig.COMMON_ENV_ENDPOINT;
		var protocol = location.protocol;
		if ("test" === env) {
			endpointURL = {
				ENV: "test",
				userauth: protocol + "//mem00t-w01.eztravel.com.tw/",
				hybrid: "http://mweb-t01.eztravel.com.tw/api/1/hybrid/",
				GCP: "https://static-test.cdn-eztravel.com.tw/"
			}
		} else if ("ws" === env) {
			endpointURL = {
				ENV: "ws",
				userauth: protocol + "//mem-ws01.eztravel.com.tw/",
				hybrid: "https://mweb-ws01.eztravel.com.tw/api/1/hybrid/",
				GCP: "https://static-ws.cdn-eztravel.com.tw/"
			}
		} else {// prod
			endpointURL = {
				ENV: "prod",
				userauth: "https://member.eztravel.com.tw/",
				hybrid: "https://m.eztravel.com.tw/api/1/hybrid/",
				GCP: "https://static.cdn-eztravel.com.tw/"
			}
		}
		if (type === "new") window.ApiEndpointConfig = {};
		ApiEndpointConfig.COMMON_ENV_ENDPOINT = endpointURL.ENV;
		ApiEndpointConfig.COMMON_USERAUTH_ENDPOINT = endpointURL.userauth;
		ApiEndpointConfig.COMMON_STATIC_CDN_ENDPOINT = endpointURL.GCP;
	}
	function init() {
		if (typeof (ApiEndpointConfig) === "object") {
			if (
				!ApiEndpointConfig.hasOwnProperty("COMMON_ENV_ENDPOINT") &&
				!ApiEndpointConfig.hasOwnProperty("COMMON_USERAUTH_ENDPOINT") &&
				!ApiEndpointConfig.hasOwnProperty("COMMON_STATIC_CDN_ENDPOINT")
			) { setDiscountApiEndpoint(); } else {
				if (typeof (Crocodile) === "object") {
					if (window.Crocodile.isHybrid) {
						ApiEndpointConfig.COMMON_USERAUTH_ENDPOINT = ApiEndpointConfig.COMMON_MWEB_ENDPOINT + "api/1/hybrid/";
					}
				}
			}
		} else { setDiscountApiEndpoint("new"); }
		window.SOURCE_REF = ApiEndpointConfig.COMMON_ENV_ENDPOINT !== "dev" ? ApiEndpointConfig.COMMON_STATIC_CDN_ENDPOINT : location.protocol + "//" + location.host + "/";
	}
	init();
}());
//ç›¸å®¹æ°¸å®‰Mç‰ˆç”¨Zepto
var jslib = typeof (jQuery) === "function" ? jQuery : Zepto;
var discountCode = (new function ($) {
	this.ezModal;
	this.callback = function () { };//å„å•†å“é é‡æ•´
	this.apiSuccess = function () { };//åˆå§‹å¾Œå›žå‚³å¯ç”¨åˆ—è¡¨åŠæœ€å„ªæƒ æŠ˜æ‰£ç¢¼
	this.requestFrom = '';
	this.layout = '';
	this.custNo = '';
	this.key = null;//å‚³å…¥çš„å•†å“è³‡æ–™
	this.productData = {};
	this.discountCodes
	this.cache = {};
	this.missDiscount = true;
	this.multiple = false;//å¤šç­†
	this.multipleApply = false;
	this.multipleApplyDiscounts = [];//å¤šç­†é©ç”¨æŠ˜æ‰£ç¢¼è³‡æ–™
	this.multipleBestPrice = {};
	this.best = {};
	this.selected = false;
	this.selectedDiscountCode = ''; //é¸åˆ°çš„code
	this.selectedInput = null;
	this.pcHasRwd = false;
	var SOURCE_REF = ApiEndpointConfig.COMMON_ENV_ENDPOINT !== "dev" ? ApiEndpointConfig.COMMON_STATIC_CDN_ENDPOINT : location.protocol + "//" + location.host + "/";
	var img = {
		coupon: {
			src: SOURCE_REF + 'assets/images/common/discount-modal/coupon.svg'
		},
		success: {
			src: SOURCE_REF + 'assets/images/common/discount-modal/success.svg'
		},
		wrong: {
			src: SOURCE_REF + 'assets/images/common/discount-modal/wrong.svg'
		},
		busy: {
			src: SOURCE_REF + 'assets/images/common/mem-modal/system-busy.svg'
		},
		empty: {
			src: SOURCE_REF + 'assets/images/common/discount-modal/empty.svg'
		},
	}
	window.discountCodeCheck = false;
	function addComma(numNoComma) {
		while (/(\d+)(\d{3})/.test(numNoComma.toString())) {
			numNoComma = numNoComma.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
		}
		return numNoComma;
	}
	function ezModal_layoutEnv() {
		if (typeof ApiEndpointConfig === 'object') {
			if (ApiEndpointConfig.COMMON_LAYOUT_ENV === 'MWEB') return 'MWEB'
		}
		return 'PC'
	}
	function checkPCRwd() {
		if ($('html').hasClass('rwd')) {//æ‰“é–‹ç‡ˆç®±æ™‚å‘¼å«ä¸€æ¬¡
			$('html').removeClass('rwd');
			discountCode.pcHasRwd = true;
		}
		if (discountCodeCheck == false && discountCode.pcHasRwd == true) {
			$('html').addClass('rwd');
			discountCode.pcHasRwd = false;
		}
	}
	function cachedScript(url, done) {
		$.ajax({
			type: "GET",
			dataType: "script",
			cache: true,
			url: url,
			success: done,
			error: function (error) {
				$.ajax({ // errorå†é‡è¤‡è¼‰å…¥ä¸€æ¬¡
					type: "GET",
					dataType: "script",
					cache: true,
					url: url,
					success: done
				})
			}
		});
	}
	/* ------------------- html-----------------*/
    /**
	 * é ˜å–æŠ˜æ‰£ç¢¼çš„inputå€å¡Š
	 */
	function getDiscountCodeInputBlock() {
		!arguments[0] ? arguments[0] = '' : arguments[0];
		return '<div class="input-group-cover ' + arguments[0] + '">\
		  			<form autocomplete="off"name="discountSrch" id="discountSrch">\
						<div class="ezModal-input-group">\
							<div class="input-box">\
								<input type="text" autocomplete="off" name="discountCode" id="ezModal-main-discountCode" placeholder="è«‹è¼¸å…¥æŠ˜æ‰£ç¢¼" maxlength="13">\
			  			  	</div>\
			  			  	<div class="claimButton">\
								<button class="ezModal-greenBtn" id="discountSubmit">é ˜å–</button>\
			  			  	</div>\
						</div>\
					</form>\
				</div>'
	}
	/**
	 * MWEBé ˜å–æŠ˜æ‰£ç¢¼çš„inputå€å¡Š
	 */
	function MWEBGetDiscountCodeInputBlock() {

		return '<div class="inputTitleBlock">\
					<div class="modalTitle">æŠ˜æ‰£ç¢¼</div>\
					<form autocomplete="off" name="discountSrch" id="discountSrch">\
						<div class="input-group">\
							<div class="input-box">\
								<input type="text" autocomplete="off" name="discountCode" id="ezModal-main-discountCode" placeholder="è«‹è¼¸å…¥æŠ˜æ‰£ç¢¼" maxlength="13"/>\
								<span class="close-btn"></span>\
							</div>\
							<div class="claimButton">\
								<button class="discountClaim ezModal-greenBtn" id="discountSubmit">é ˜å–</button>\
							</div>\
						</div>\
					</form>\
				</div>'
	}
    /**
	 * @param {*} data :å›žå‚³æŠ˜æ‰£ç¢¼åˆ—è¡¨çš„è³‡æ–™
	 */
	function discountCodeListBlock(data, value) {
		var htmlStr = '', discountList = {}, isNew, fontSize;
		for (i = 0; i < data.length; i++) {
			isNew = data[i].isNew == true ? 'isNew' : '';
			fontSize = parseInt(data[i].totalSave) > 9999 ? 'fz18' : data[i].totalSave > 99999 ? 'fz16' : '';

			discountList = {
				orderDtBegins: data[i].orderDtBegins === 'å³æ—¥èµ·' ? 'å³æ—¥èµ·~' : data[i].orderDtBegins.split('-').join('/') + '~',
				orderDtExpires: data[i].orderDtExpires === '- -' ? 'ä¸é™æ•ˆæœŸ' : data[i].orderDtExpires.split('-').join('/'),
				condition: data[i].minOrderPrice > 0 ? 'æ»¿' + data[i].minOrderPrice + 'å…ƒ' : 'ä¸é™',
				discountValue: data[i].discountType === 'CASH' ? addComma(parseInt(data[i].discountValue)) : data[i].discountValue,
				discountType: data[i].discountType === 'CASH' ? 'å…ƒ' : 'æŠ˜'
			}
			htmlStr +=
				'<div class="ticket">\
					<input type="radio" name="discountCode" id="checkDiscount'+ data[i].code + '" value="' + data[i].code + '" favourable="' + data[i].discountPrice + '" projno="' + data[i].projNo + '" price="' + data[i].originalPrice + '">\
					<label for="checkDiscount'+ data[i].code + '">\
						<div class="card cardLeft">\
						<div class="newTag '+ isNew + '">æ–°é ˜å–</div>\
							<div class="discountDetail">\
								<h3 class="discountTitle">'+ data[i].projName + '<ul class="detailBlock">\
									<li>èªªæ˜Ž\
										<div class="discountCodeInfo">\
											<div class="close-btn"></div>\
											<div class="infoContainer">\
												<div class="condition">\
													<p>ä½¿ç”¨æ™‚é–“&nbsp;:&nbsp;'+ discountList.orderDtBegins + discountList.orderDtExpires + '</p>\
													<p>å„ªæƒ å…§å®¹&nbsp;:&nbsp;<span>'+ discountList.discountValue + discountList.discountType + '</span></p>\
													<p>è¨‚å–®æ¢ä»¶&nbsp;:&nbsp;'+ discountList.condition + '</p>\
													<p class="desc">'+ data[i].projRemark + '</p>\
												</div>\
											</div>\
										</div>\
									</li>\
								</ul>\
								</h3>\
							</div>\
							<p class="dateExpire">æœŸé™&nbsp;'+ discountList.orderDtExpires + '</p>\
						</div>\
						<div class="card cardRight">\
							<div class="pillHint grey chooseStatus"></div>\
							<div class="number">\
								<p>ç¾æŠ˜</p>\
								<span><span class="cashValueStr '+ fontSize + '">' + addComma(parseInt(data[i].totalSave)) + '</span>å…ƒ</span>\
							</div>\
						</div>\
					</label>\
				</div>'
		}
		return htmlStr;
	}
	function withDiscountModalBlock(data, value) {
		$('.G-ezModal-modal-close-btn').show();
		return '<div class="ezModal-wrap discountCodeBlock pt40">\
                <div class="ezModal-discount ezModal-main-discountCode">\
                    '+ getDiscountCodeInputBlock('list') + '\
                    <div class="dropdownBackground"></div>\
                    <div class="couponList owner">\
						<div class="title">æˆ‘çš„æŠ˜æ‰£ç¢¼</div>\
						<div class="sub-title">é©ç”¨</div>\
                        <div class="content apply">\
                            '+ discountCodeListBlock(data, value) + '\
                        </div>\
                    </div>\
                </div>\
                <div class="ezModal-buttonBlock">\
                    '+ useButtonBlock("discountCode", "ä½¿ç”¨") + '\
                </div>\
            </div>';
	}
	function MWEBDiscountCodeListBlock(data, value) {
		var modalHide = 'data-dismiss="modal" aria-hidden="true"';
		var htmlStr = '', couponTip = '', _app, isNew, discountList = {};
		couponTip = discountCode.productData.tid === 'abs' ? 'æ©Ÿç¥¨æŠ˜æ‰£ç¢¼ä½¿ç”¨é–€æª»ä»¥æœªç¨…æ©Ÿç¥¨é‡‘é¡è¨ˆç®—' : 'æŠ˜æ‰£ç¢¼ä¸€ç¶“ä½¿ç”¨å³ç„¡æ³•è¿”é‚„ã€‚';
		data.length == 0 ? htmlStr = '<p class="couponTip empty">æ²’æœ‰å¯ä»¥ä½¿ç”¨çš„æŠ˜æ‰£ç¢¼</p>' : htmlStr = '<p class="couponTip apply">' + couponTip + '</p>';

		for (i = 0; i < data.length; i++) {
			_app = data[i].appOnly == true ? '_app' : '';
			isNew = data[i].isNew == true ? 'isNew' : '';
			discountList = {
				condition: data[i].minOrderPrice > 0 ? 'æ»¿' + addComma(parseInt(data[i].minOrderPrice)) + 'å…ƒ&nbsp;' : 'ä¸é™é‡‘é¡&nbsp;',
				discountValue: data[i].discountType == 'CASH' ? addComma(parseInt(data[i].discountValue)) : data[i].discountValue,
				discountType: data[i].discountType == 'CASH' ? 'å…ƒ' : 'æŠ˜'
			}
			discountList.value = data[i].discountType == 'CASH' ? 'ç¾æŠ˜' : discountList.discountValue + discountList.discountType;
			htmlStr +=
				'<div class="coupon apply">\
				<input type="radio" name="discountCode" id="checkDiscount'+ data[i].code + '" value="' + data[i].code + '" favourable="' + data[i].discountPrice + '" projno="' + data[i].projNo + '" price="' + data[i].originalPrice + '"/>\
				<label for="checkDiscount'+ data[i].code + '"' + modalHide + '>\
				<div class="ticket left">\
					<div class="discount_number '+ _app + ' ' + isNew + '">\
					<div class="discount_tag"><span class="device new '+ isNew + '">æ–°é ˜å–</span><span class="device ' + _app + '">APPé™å®š</span></div>\
              			<p><span>'+ discountList.condition + discountList.value + '</span></p>\
             			<p><span class="cashValueStr">'+ addComma(parseInt(data[i].totalSave)) + '</span>&nbsp;å…ƒ</p>\
            		</div>\
		  		</div>\
		  		<div class="ticket right">\
		  			<div class="label">\
              			<span class="checkStatus"></span>\
           	 		</div>\
            		<div class="detail">\
              			<p class="discountTitle">'+ data[i].projName + '</p>\
             			<p class="expire">æ•ˆæœŸè‡³'+ data[i].orderDtExpires + '</p>\
            		</div>\
				  </div>\
				  </label>\
			</div>'
		}
		return htmlStr;
	}
	function MWEBWithDiscountModalBlock(data, value) {
		return MWEBGetDiscountCodeInputBlock() + '\
				<div class="ezModal-wrap discountCodeBlock">\
					<div class="ezModal-discount ezModal-main-discountCode">\
						<div class="couponList">\
								'+ MWEBDiscountCodeListBlock(data, value) + '\
						</div>\
					</div>\
				</div>';
	}
    /**
	 * @name ä½¿ç”¨æŒ‰éˆ•å€å¡Š
	 * @param {*} id id:discount
	 * @param {*} textGreen é è¨­ä½¿ç”¨çš„æ¨£å¼
	 */
	function useButtonBlock(id, textGreen) {
		return '<div class="ezModal-btn-center">\
					<button id="'+ id + '-use" class="ezModal-greenBtn close-btn disabled">' + textGreen + '<span>è«‹å…ˆé¸æ“‡æŠ˜æ‰£ç¢¼</span></button>\
				</div>'
	}
    /**
	 * ç©ºçš„æŠ˜æ‰£ç¢¼åˆ—è¡¨å€å¡Š
	 */
	function emptyDiscountCodeBlock() {
		return '<div class="couponList empty">\
		  			<div class="couponIcon">\
						<img src="'+ img.empty.src + '">\
		  			</div>\
		  			<div class="content">\
						<div class="content-title">å°šç„¡æŠ˜æ‰£ç¢¼</div>\
						<div class="content-text">æŠ˜æ‰£ç¢¼å°‡ä¸å®šæœŸæŽ¨å‡ºï¼Œæ­¡è¿ŽåŠ å…¥ç²‰çµ²é ç²å¾—æœ€æ–°è³‡è¨Šï¼›çœæ—…è²»ï¼ŒéŠä¸–ç•Œï¼</div>\
		  			</div>\
				</div>'
	}
    /**
	 * @param {*} id id id:discount
	 * @param {*} text å¤§æŒ‰éˆ•ä½¿ç”¨çš„æ–‡å­—:ç¢ºèª
	 */
	function largeButtonBlock(id, text, width) {
		return '<div class="ezModal-btn-center">\
					<button id='+ id + ' class="ezModal-greenBtn close-btn ' + width + '" data-dismiss="modal" aria-hidden="true">' + text + '</button>\
				</div>'
	}
    /**
	 * @param {*} id 
	 * @param {*} text ç¢ºèª:emptyæŠ˜æ‰£ç¢¼
	 */
	function closeButtonBlock(id, text) {
		return '<div class="ezModal-btn-center">\
					<button id='+ id + ' class="ezModal-greenBtn close-btn">' + text + '</button>\
				</div>'
	}
	function emptyDiscountModalBlock() {
		return '<div class="ezModal-wrap discountCodeBlock">\
					<div class="ezModal-discount empty">\
						'+ getDiscountCodeInputBlock() + '\
						<div class="title">æˆ‘çš„æŠ˜æ‰£ç¢¼</div>\
						'+ emptyDiscountCodeBlock() + '\
					</div>\
					<div class="ezModal-buttonBlock">\
						'+ largeButtonBlock("discountCode", "ç¢ºèª", "wd120") + '\
					</div>\
				</div>';
	}
	function errorDiscountModal(data) {
		var failMessage;
		data.code === "01" || data.code === "05" ? failMessage = "æŠ˜æ‰£ç¢¼é ˜å–å¤±æ•—" : failMessage = data.message;
		return '<div class="ezModal-wrap error">\
					<div class="ezModal-h1 sub mb-30">é ˜å–å¤±æ•—</div>\
						<div class="couponIcon ezModal-middle"><img src='+ img.wrong.src + '></div>\
						<div class="content ezModal-middle text-center">'+ failMessage + '</div>\
						'+ closeButtonBlock("fail-discount-button", "ç¢ºèª") + '\
					</div>';
	}
	function busyDiscountModal() {
		return '<div class="ezModal-wrap busy">\
          			<div class="couponIcon ezModal-middle pt-100"></div>\
         			<div class="content ezModal-middle mt-90 ezModal-btn-center">ç³»çµ±å¿™ç¢Œä¸­ï¼Œè«‹ç¨å¾Œå†è©¦</div>\
				</div>';
	}
    /**
	 * @param {*} data 
	 * @param {*} value -å°‡åŒä¸€å€‹å•†ç·¨å¤šé …å•†å“å›žå‚³æŠ˜æ‰£ç¢¼çµ„æˆdiscountMapçš„è³‡æ–™
 	 * @param {*} inputOne 
	 * @param {string} apply å‚³é€²'chooseStatus'ç‚ºé©ç”¨æ¨£å¼,'notApply'ç‚ºä¸é©ç”¨
	 * @param {string} notApply å‚³é€²'ä¸é©ç”¨'ç‚ºä¸é©ç”¨é¡¯ç¤ºtagæ–‡å­—,''ç‚ºé©ç”¨æ™‚æ–‡å­—
	 */
	function addLastOneBlock(data, value, inputOne, apply, notApply) {
		var disabled, isNew, htmlStr = '', app, discount, discountList, fontSize, discountData = {};
		disabled = notApply == 'ä¸é©ç”¨' ? 'disabled' : '';
		for (i = inputOne; i < data.length; i++) {
			!value ? discountList = data[i] : discountList = value[i];
			if (discountList.totalSave) {
				fontSize = parseInt(discountList.totalSave) > 9999 ? 'fz18' : discountList.totalSave > 99999 ? 'fz16' : '';
			}
			isNew = discountList.isNew == true ? 'isNew' : '';
			discountList.appOnly == true ? app = 'app' : app = '';
			discount = !discountList.totalSave ? 'å„ªæƒ ' : 'ç¾æŠ˜';
			discountData = {
				discountValue: discountList.discountType === 'CASH' ? addComma(parseInt(discountList.discountValue)) : discountList.discountValue,
				discountType: discountList.discountType === 'CASH' ? 'å…ƒ' : 'æŠ˜',
				orderDtBegins: discountList.orderDtBegins === 'å³æ—¥èµ·' ? 'å³æ—¥èµ·~' : discountList.orderDtBegins.split('-').join('/') + '~',
				orderDtExpires: discountList.orderDtExpires === '- -' ? 'ä¸é™æ•ˆæœŸ' : discountList.orderDtExpires.split('-').join('/'),
				condition: discountList.minOrderPrice > 0 ? 'æ»¿' + addComma(parseInt(discountList.minOrderPrice)) + 'å…ƒ' : 'ä¸é™',
			}
			discountData.totalSave = !discountList.totalSave ? '<span class="cashValueStr">' + discountData.discountValue + '</span>' + discountData.discountType : '<span class="cashValueStr ' + fontSize + '">' + addComma(parseInt(discountList.totalSave)) + '</span>å…ƒ';

			htmlStr +=
				'<div class="ticket">\
					<input type="radio"\
					name="discountCode"\
					id="checkDiscount'+ discountList.code + '"\
					value="' + discountList.code + '"\
					favourable="' + discountList.discountPrice + '"\
					price="' + discountList.originalPrice + '"\
					projno="' + discountList.projNo + '"\
					'+ disabled + '>\
			<label for="checkDiscount'+ discountList.code + '" class="' + apply + '">\
				<div class="card cardLeft">\
				<div class="newTag '+ isNew + '">æ–°é ˜å–</div>\
					<div class="discountDetail">\
						<h3 class="discountTitle">'+ discountList.projName + '<ul class="detailBlock">\
							<li>èªªæ˜Ž\
								<div class="discountCodeInfo">\
									<div class="close-btn"></div>\
									<div class="infoContainer">\
										<div class="condition">\
											<p>ä½¿ç”¨æ™‚é–“&nbsp;:&nbsp;'+ discountData.orderDtBegins + discountData.orderDtExpires + '</p>\
											<p>å„ªæƒ å…§å®¹&nbsp;:&nbsp;<span>'+ discountData.discountValue + discountData.discountType + '</span></p>\
											<p>è¨‚å–®æ¢ä»¶&nbsp;:&nbsp;'+ discountData.condition + '</p>\
											<p class="desc">'+ discountList.projRemark + '</p>\
										</div>\
									</div>\
								</div>\
							</li>\
						</ul>\
						</h3>\
					</div>\
					<p class="notMatch '+ app + '">APPé™å®š</p>\
					<p class="dateExpire">æœŸé™&nbsp;'+ discountData.orderDtExpires + '</p>\
				</div>\
				<div class="card cardRight">\
					<div class="pillHint grey '+ apply + '">' + notApply + '</div>\
					<div class="number">\
						<p>'+ discount + '</p>\
						<span>'+ discountData.totalSave + '</span>\
					</div>\
				</div>\
			</label>\
		</div>'
			break;
		}
		return htmlStr;
	}
	function addLastOneMWEBBlock(data, value, inputOne, notApply) {
		var disabled, _app, isNew, htmlStr = '', discountList, discountData = {};
		var modalHide = 'data-dismiss="modal" aria-hidden="true"';
		disabled = notApply == 'notApply' ? 'disabled' : '';
		for (i = inputOne; i < data.length; i++) {
			discountList = !value ? data[i] : value[i];
			isNew = discountList.isNew == true ? 'isNew' : '';
			discountList.originalPrice = notApply == 'notApply' ? '' : discountList.originalPrice;
			discountList.discountPrice = notApply == 'notApply' ? '' : discountList.discountPrice;
			_app = discountList.appOnly == true ? '_app' : '';
			discountData = {
				discountValue: discountList.discountType === 'CASH' ? addComma(parseInt(discountList.discountValue)) : discountList.discountValue,
				discountType: discountList.discountType === 'CASH' ? 'å…ƒ' : 'æŠ˜',
				condition: discountList.minOrderPrice > 0 ? 'æ»¿' + addComma(parseInt(discountList.minOrderPrice)) + 'å…ƒ&nbsp;' : 'ä¸é™é‡‘é¡&nbsp;'
			}
			discountData.totalSave = !discountList.totalSave ? '<span class="cashValueStr">' + discountData.discountValue + '</span>&nbsp;' + discountData.discountType + '' : '<span class="cashValueStr">' + addComma(parseInt(discountList.totalSave)) + '</span>&nbsp;å…ƒ';
			discountData.value = !discountList.totalSave ? 'å„ªæƒ ' : discountData.discountType == 'å…ƒ' ? 'ç¾æŠ˜' : discountData.discountValue + discountData.discountType;

			htmlStr +=
				'<div class="coupon ' + notApply + '">\
			 <input type="radio"\
				 		name="discountCode"\
				 		id="checkDiscount'+ discountList.code + '"\
				 		value="' + discountList.code + '"\
						favourable="' + discountList.discountPrice + '"\
						projno="' + discountList.projNo + '"\
						price="' + discountList.originalPrice + '"\
						'+ disabled + '>\
			<label for="checkDiscount'+ discountList.code + '"' + modalHide + '>\
          		<div class="ticket left">\
					<div class="discount_number '+ _app + ' ' + isNew + '">\
					<div class="discount_tag"><span class="device new '+ isNew + '">æ–°é ˜å–</span><span class="device ' + _app + '">APPé™å®š</span></div>\
              			<p><span>'+ discountData.condition + discountData.value + '</span></p>\
             			<p>'+ discountData.totalSave + '</p>\
            		</div>\
		  		</div>\
		  		<div class="ticket right">\
		  			<div class="label '+ notApply + '">\
					  <span class="checkStatus"></span>\
           	 		</div>\
            		<div class="detail">\
              			<p class="discountTitle">'+ discountList.projName + '</p>\
             			<p class="expire">æ•ˆæœŸè‡³'+ discountList.orderDtExpires + '</p>\
            		</div>\
				  </div>\
				  </label>\
			</div>'
			break;
		}
		return htmlStr;
	}
	function notifyBlock(text, color) {
		return '<div class="notifyBlock">\
		  			<div class="notifyDiscountCode '+ color + '">' + text + '</div>\
					<div class="btnCloseDiscountCode">\
						<img class="btnClose" src="https://static-test.cdn-eztravel.com.tw/assets/images/common/icon-circle-close.svg">\
					</div>\
				</div>';
	}
	/**
	 * é ˜å–æˆåŠŸçš„å‹•ç•«(é è¨­ç‚º5ç§’æ·¡å‡º)
	 */
	function claimSuccess() {
		if ($('.notifyBlock .notifyDiscountCode').length === 0) {
			$('.couponList.owner .title').addClass('marginMinus');
			$('.G-ezModal .couponList').prepend(notifyBlock("é ˜å–æˆåŠŸ", ""));//æ–°å¢žé ˜å–æˆåŠŸçš„æç¤º
		} else {
			$('.couponList .notifyBlock').removeClass('fadeIn fadeOut');
		}
		setTimeout(function () { $('.couponList .notifyBlock').addClass('fadeIn') }, 200)//å¾žå·¦è‡³å³ç§»å…¥
		setTimeout(function () { $('.couponList .notifyBlock').addClass('fadeOut') }, 10000)//å†æ·¡å‡º

		$('.btnClose').on('click', function () {
			$('.couponList .notifyBlock').css('opacity', '0')
		})
	}
	function adjustModalHeight() {
		if ($('.couponList .ticket').length < 4) {
			$('.couponList').addClass('overflowReset');
		} else {
			$('.couponList').removeClass('overflowReset');
		}
		$('#ezModal-main').css('height', 'auto');
	}
    /**
	 * æ“ä½œinputåŠæŒ‰éˆ•
	 */
	function changeInputStatToLoading() {
		$("#ezModal-main #discountSubmit").prop("disabled", true).addClass("loading");
		$("#ezModal-main-discountCode").attr("disabled", true)
		$("#ezModal-main #discountSubmit").css('background-color', '#119d36').text('');
		ezModal_layoutEnv() === 'MWEB' ? $("#ezModal-main .input-box").addClass('loading') :
			$("#ezModal-main .input-group-cover").addClass('loading');
	}
	function changeInputStatToNormal() {
		$("#ezModal-main #discountSubmit").prop("disabled", false).removeClass("loading");
		$("#ezModal-main-discountCode").removeAttr("disabled")
		$("#ezModal-main #discountSubmit").css('background-color', '').text('é ˜å–');
		ezModal_layoutEnv() === 'MWEB' ? $("#ezModal-main .input-box").removeClass('loading') :
			$("#ezModal-main .input-group-cover").removeClass('loading');
	}
	function changeBtnStatToNormal() {
		$('#ezModal-main .ezModal-greenBtn').prop('disabled', false).removeClass('disabled loading');
	}
	function changeBtnStatToLoading() {
		$('#ezModal-main .ezModal-greenBtn').prop('disabled', true).addClass('disabled');
	}
	/*call api*/
    /**
	 * é»žæ“Šé ˜å–æŠ˜æ‰£ç¢¼:
	 */
	function getDiscountCode(prodData) {
		var data = { discountCode: $.trim($('#ezModal-main-discountCode').val()) }
		var discountCodeInfo = { discountCode: data.discountCode, custNo: discountCode.custNo }
		callDiscountCodeClaim(discountCodeInfo, prodData)
	}
    /**
	 * æª¢æŸ¥è¼¸å…¥çš„æŠ˜æ‰£ç¢¼æ˜¯å¦é©ç”¨æ­¤å•†å“
	 * @param {object} responseData - é©ç”¨æ­¤å•†å“çš„æŠ˜æ‰£ç¢¼æ‰€æœ‰è³‡æ–™
	 * @param {string} inputDiscountCode - è¼¸å…¥çš„æŠ˜æ‰£ç¢¼(äº‚æ•¸13ç¢¼) 
	 */
	function checkApplyDiscountCode(responseData, inputDiscountCode) {
		var checkApply = false;
		var key = 'discountCode';
		var inputOne = 0;
		for (var i = 0; i < responseData.length; i++) {
			if (responseData[i].hasOwnProperty(key) && responseData[i][key] === inputDiscountCode) {
				//å¦‚æžœå‰›è¼¸å…¥é©ç”¨æ­¤å•†å“é¡¯ç¤ºé ˜å–æˆåŠŸä¸¦é©ç”¨æ­¤è¨‚å–®
				checkApply = true;
				inputOne = i
			}
		}
		return {
			checkApply: checkApply,
			inputOne: inputOne
		}
	}
    /**
	 * éžé©ç”¨æ­¤å•†å“ï¼Œæ¯”å°æœƒå“¡æœ‰æ•ˆçš„æŠ˜æ‰£ç¢¼,åˆ¤æ–·å‡ºç¾ä¸é©ç”¨ç•«é¢
	 * @param {string} key -ä»¥"discountCode"æ¯”å°
	 * @param {string} inputDiscountCode - è¼¸å…¥çš„æŠ˜æ‰£ç¢¼(äº‚æ•¸13ç¢¼)
	 * @param {object} prodData - å‚³å…¥çš„å•†å“ç·šè³‡æ–™ 
	 */
	function callDiscountValid(key, inputDiscountCode, prodData) {
		var checkDiscountCodeUrl = ApiEndpointConfig.COMMON_USERAUTH_ENDPOINT + "auth/discount/valid?custNo=" + discountCode.custNo;

		$.ajax({
			type: 'GET',
			dataType: 'json',
			async: false,
			cache: false,
			xhrFields: {
				withCredentials: true
			},
			url: checkDiscountCodeUrl,
			success: function (data) {//æœƒå“¡æŠ˜æ‰£ç¢¼åˆ—è¡¨çš„è³‡æ–™
				var moveNotApply = false;
				var inputOne = 0, discountCodeNotApply;
				for (var i = 0; i < data.length; i++) {
					if (data[i].hasOwnProperty(key) && data[i][key] === inputDiscountCode) {

						moveNotApply = true;
						inputOne = i;
					}
				}
				if (moveNotApply) {
					discountCodeNotApply = flatNotApplyDiscountCode(data);
					if (discountCode.layout === 'PC') {
						if ($('.couponList').hasClass('empty')) {//åŽŸæœ¬ç•«é¢ç‚ºç©ºåˆ·æ–°ç‚ºä¸é©ç”¨æŠ˜æ‰£ç¢¼çš„ç•«é¢
							$('.G-ezModal .ezModal-discount').removeClass('empty').addClass('ezModal-main-discountCode')
							$('.title').remove();
							$('.input-group-cover').addClass('list').after('<div class="dropdownBackground"></div>');
							$('.couponList').removeClass('empty').addClass('owner').empty();
							$('.couponList').append('<div class="title">æˆ‘çš„æŠ˜æ‰£ç¢¼</div><div class="sub-title">ä¸é©ç”¨</div><div class="content notApply"></div>');
							$('#discountCode').remove();
							$('.ezModal-buttonBlock').show();
							$('.ezModal-btn-center').html('<button id="discountCode-use" class="ezModal-greenBtn close-btn">ä½¿ç”¨<span>è«‹å…ˆé¸æ“‡æŠ˜æ‰£ç¢¼</span></button>')

						}
						if ($('.content.notApply').length == 0) {//ç•¶é‚„æœªå‡ºç¾ç¬¬ä¸€ç­†ä¸é©ç”¨æ™‚
							$('.couponList .content').after('<div class="sub-title">ä¸é©ç”¨</div>');
							$('.couponList').append('<div class="content notApply"></div>');
						};
						if ($('.content.apply').length == 0) {
							$('#discountSubmit').hide();
							$('#discountCode-use').addClass('disabled')
						}

						$('.G-ezModal .couponList .content.notApply').prepend(addLastOneBlock(discountCodeNotApply, '', inputOne, 'notApply', 'ä¸é©ç”¨'));
						adjustModalHeight();
						claimSuccess();
					} else {
						if (discountCode.multipleApply !== true) {//å¤šç­†æ­¸æˆ¶æœ‰å‡ºç¾é©ç”¨æ‰æœƒæ˜¯true
							MWEBAlert('é ˜å–æˆåŠŸ<br>ä½†ä¸ç¬¦åˆæœ¬è¨‚å–®ä½¿ç”¨æ¢ä»¶', 'ç¢ºèª');
						}
						if ($('.couponTip.empty').length > 0) {
							$('.couponTip.empty').remove();
						}
						if ($('.couponTip.notApply').length == 0) {
							$('.couponList').append('<p class="couponTip notApply">æœªé”æŠ˜æ‰£æ¢ä»¶</p>');
						}

						$('.rwd .G-ezModal .couponList').append(addLastOneMWEBBlock(discountCodeNotApply, '', inputOne, 'notApply'))
					}
				}
			},
			error: function () {
				if (discountCode.layout == 'MWEB') {
					$('html').addClass('rwd');
					$('.G-ezModal-modal-dialog').css('width', '')
				}
				var busy = {
					page: 'busy'
				}
				if (discountCode.ezModal) { showDiscountCodeModal(busy); } else {
					window.discountCodeCheck = false;
				}
			},
			timeout: 30000
		})
	}
    /**
	 * å‘¼å«(availableDiscountForProd)API-å–å¾—é©ç”¨å•†å“æŠ˜æ‰£ç¢¼åˆ—è¡¨-ä»¥objectå‚³éž
	 * @param {object} data - å•†å“è³‡æ–™  
	 * @param {string} checkApplyCode -å¾žæ­¸æˆ¶apiå›žå‚³è¼¸å…¥çš„æŠ˜æ‰£ç¢¼äº‚æ•¸13ç¢¼ 
	 */
	function callAvailableDiscountForProd(dataObj) {
		var checkDiscountCodeProdUrl = ApiEndpointConfig.COMMON_USERAUTH_ENDPOINT + "auth/discount/availableDiscountForProd";
		$.ajax({//å‘¼å«æ­¤å•†å“æœ‰æ•ˆæŠ˜æ‰£ç¢¼
			type: "post",
			dataType: 'json',
			contentType: 'application/json',
			async: false,
			cache: false,
			data: JSON.stringify(dataObj.prodData),
			xhrFields: {
				withCredentials: true
			},
			url: checkDiscountCodeProdUrl,
			success: function (response) {//æ‰€æœ‰å¯ç”¨çš„æŠ˜æ‰£ç¢¼
				var cacheKey = JSON.stringify(dataObj.prodData)//æš«å­˜è³‡æ–™çš„key

				if (dataObj.checkApplyCode) {
					if (dataObj.checkApplyCode.length > 1) {
						discountCode.multiple = true;
					}
					for (var i = 0; i < dataObj.checkApplyCode.length; i++) {
						var checkApply = false,
							temp = {},
							result = [];
						response.map(function (item, index) {
							if (!temp[item.discountCode]) {
								result.push(item);
								temp[item.discountCode] = true
							}
						})
						var checkResult = checkApplyDiscountCode(result, dataObj.checkApplyCode[i]);
						checkApply = checkResult.checkApply;
						var inputOne = checkResult.inputOne;
						var newMap = discountMap(response);
						newMap = flatDiscountList(newMap.types);

						if (!checkApply) {//ä¸é©ç”¨
							callDiscountValid('discountCode', dataObj.checkApplyCode[i], dataObj.prodData)
						} else {//é©ç”¨
							discountCode.multipleApplyDiscounts[i] = newMap.valid.find(function (item, index, array) {
								if (item.code === dataObj.checkApplyCode[i]) {
									if (item) return item
								}
							})
							if (discountCode.multiple === true) {
								discountCode.multipleApply = true;
							}
							if (discountCode.layout === 'PC') {
								if ($('.couponList').hasClass('empty')) {//ç•«é¢åŽŸæœ¬ç„¡æŠ˜æ‰£ç¢¼
									$('.G-ezModal .ezModal-discount').removeClass('empty').addClass('ezModal-main-discountCode');
									$('.ezModal-wrap.discountCodeBlock').addClass('pt40');
									$('.title').remove();
									$('.input-group-cover').addClass('list').after('<div class="dropdownBackground"></div>');
									$('.couponList').removeClass('empty').addClass('owner').empty();
									$('.couponList').append('<div class="title">æˆ‘çš„æŠ˜æ‰£ç¢¼</div><div class="sub-title">é©ç”¨</div><div class="content apply"></div>');
									$('.ezModal-buttonBlock').show();
									$('.ezModal-btn-center').html('<button id="discountCode-use" class="ezModal-greenBtn close-btn disabled">ä½¿ç”¨<span>è«‹å…ˆé¸æ“‡æŠ˜æ‰£ç¢¼</span></button>');
								}
								if ($('.content.apply').length == 0) {//ç•¶é‚„æœªå‡ºç¾ç¬¬ä¸€ç­†é©ç”¨æ™‚
									$('.couponList .title').after('<div class="sub-title">é©ç”¨</div><div class="content apply"></div>');
								};
								$('.G-ezModal .couponList .content.apply').prepend(addLastOneBlock(result, newMap.valid, inputOne, 'chooseStatus', ''));
								adjustModalHeight();
								claimSuccess();
							} else {
								var couponTip = discountCode.productData.tid === 'abs' ? 'æ©Ÿç¥¨æŠ˜æ‰£ç¢¼ä½¿ç”¨é–€æª»ä»¥æœªç¨…æ©Ÿç¥¨é‡‘é¡è¨ˆç®—' : 'æŠ˜æ‰£ç¢¼ä¸€ç¶“ä½¿ç”¨å³ç„¡æ³•è¿”é‚„ã€‚';
								MWEBAlert('é ˜å–æˆåŠŸï¼Œæ³¨æ„ä¿å­˜æœŸé™!', 'é¦¬ä¸Šä½¿ç”¨');
								if ($('.couponTip.empty').length > 0) {
									$('.couponTip.empty').remove();
								}
								if ($('.couponTip.apply').length == 0) {
									$('.couponList').prepend('<p class="couponTip apply">' + couponTip + '</p>');
								}
								$('.rwd .G-ezModal .couponList .couponTip:first-of-type').after(addLastOneMWEBBlock(result, newMap.valid, inputOne, 'apply'));
							}
							//é©ç”¨æŠ˜æ‰£ç¢¼æ›´æ–°cacheçš„è³‡æ–™
							discountCode.cache[cacheKey].valid = result;
							discountCode.cache[cacheKey].valid = newMap.valid;
							if (discountCode.cache[cacheKey].valid.length > 0) {
								discountCode.missDiscount = true;
								hint = findMostDiscount(discountCode.cache[cacheKey].valid);
								discountCode.cache[cacheKey].hint = 'æœ€é«˜-' + hint;
								if (document.querySelector('discount-component')) {
									document.querySelector('discount-component').setAttribute('hint', discountCode.cache[cacheKey].hint);
								}
							} else {
								discountCode.missDiscount = false;
							}
							if (typeof (discountCode.apiSuccess) == "function") {
								discountCode.apiSuccess(discountCode.cache[cacheKey])
							}
						}
						if (discountCode.multipleApply === true && checkApply) {
							var discountArr = discountCode.multipleApplyDiscounts.filter(function (item) { return item })
							discountCode.multipleBestPrice = Math.max.apply(null, discountArr.map(function (o, index) {
								return o.totalSave;
							}));
							discountCode.best = discountArr.find(function (item, index, array) {
								if (item.totalSave === discountCode.multipleBestPrice) {
									return item
								}
							})
						}
						changeInputStatToNormal();
					}
				} else {//init
					var hint, codeMap = discountMap(response);//å°‡åŒä¸€å¼µæŠ˜æ‰£ç¢¼ä¸åŒå•†å“çµ„åˆ
					discountCode.cache[cacheKey] = flatDiscountList(codeMap.types);
					if (discountCode.cache[cacheKey].valid.length > 0) {
						discountCode.missDiscount = true;
						hint = findMostDiscount(discountCode.cache[cacheKey].valid);
						discountCode.cache[cacheKey].hint = 'æœ€é«˜-' + hint;
						if (document.querySelector('discount-component')) {
							document.querySelector('discount-component').setAttribute('hint', discountCode.cache[cacheKey].hint);
						}
					} else {
						discountCode.missDiscount = false;
					}
					if (typeof (discountCode.apiSuccess) === "function") {
						discountCode.apiSuccess(discountCode.cache[cacheKey]);
					}
				}
			},
			error: function (e) {
				if (discountCode.layout === 'MWEB') {
					$('html').addClass('rwd');
					$('.G-ezModal-modal-dialog').css('width', '');
				}
				var busy = {
					page: 'busy'
				}
				if (discountCode.ezModal) { showDiscountCodeModal(busy); } else {
					window.discountCodeCheck = false;
				}
			},
			timeout: 30000
		})
	}
    /**
	 * æ­¸æˆ¶api
	 * @param {string} data - ä½¿ç”¨è€…è¼¸å…¥çš„æŠ˜æ‰£ç¢¼å†å‘¼å«
	 * @param {object} prodData - å‚³å…¥çš„å•†å“ç·šè³‡æ–™
	 */
	function callDiscountCodeClaim(data, prodData) {
		var discountCodeClaimUrl = ApiEndpointConfig.COMMON_USERAUTH_ENDPOINT + "auth/discount/claim";
		discountCode.multiple = false;
		discountCode.multipleApply = false;
		discountCode.multipleApplyDiscounts = [];
		discountCode.best = {};
		$.ajax({//æ­¸æˆ¶é ˜å–
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			async: false,
			cache: false,
			data: JSON.stringify(data),
			xhrFields: {
				withCredentials: true
			},
			url: discountCodeClaimUrl,
			success: function (response) {
				if (response.code == "00") {//æ­¸æˆ¶æˆåŠŸ
					var checkApplyCodes = [];//æ­¸æˆ¶å¾Œçš„æŠ˜æ‰£æ•¸äº‚ç¢¼æˆ–æ˜¯åŽŸæœ¬è¼¸å…¥çš„13ç¢¼
					for (var i = 0; i < response.discounts.length; i++) {//å¤šç­†æ­¸æˆ¶
						!response.discounts[i].discountCode ? checkApplyCodes[i] = data.discountCode : checkApplyCodes[i] = response.discounts[i].discountCode;
					}

					var checkData = {
						prodData: prodData,
						checkApplyCode: checkApplyCodes//['1','2']
					}
					callAvailableDiscountForProd(checkData)
				} else {//æ­¸æˆ¶å¤±æ•—
					if (discountCode.layout === 'PC') {
						var claimFail = {
							data: response,
							page: 'error'
						}
						showDiscountCodeModal(claimFail);
					} else {
						var mClaimFail = {
							data: response,
							page: 'MWEBError'
						}
						showDiscountCodeModal(mClaimFail);
						changeInputStatToNormal();
					}
				}
				setTimeout(function () {
					$('#ezModal-main-discountCode').val('');
				}, 100);
			},
			error: function (e) {
				if (discountCode.layout === 'MWEB') {
					$('html').addClass('rwd');
					$('.G-ezModal-modal-dialog').css('width', '')
				}
				var busy = {
					page: 'busy'
				}
				if (discountCode.ezModal) { showDiscountCodeModal(busy); } else {
					window.discountCodeCheck = false;
				}
			},
			timeout: 30000
		})
	}
	/*bind event */
	function allPageBind() {
		$(document)
			//input focus blur
			.on("focus.ezModal-event", "#ezModal-main .ezModal-use_focus", function () {
				$(this).closest(".ezModal-input-box").addClass("ezModal-input-focus");
			})
			.on("blur.ezModal-event", "#ezModal-main .ezModal-use_focus", function () {
				$(this).closest(".ezModal-input-box").removeClass("ezModal-input-focus");
			})
	}
	function discountCodeBind(prodData) {
		$(document)
			//checkform
			.on("click.ezModal-event", "#ezModal-main #discountSubmit", function () { discountCodeCheckForm(prodData) })
			//input enter submit
			.on("keypress.ezModal-event", "#ezModal-main .ezModal-main-discountCode input", function (e) {
				if (e.keyCode == 13) $("#discountCode").trigger("click");
			})
			.on("click.ezModal-event", "#ezModal-main #fail-discount-button", function () {
				discountCodes();
			})
			.on("click.ezModal-event", ".ezModal-main-discountCode input[type='radio']", function () {
				if ($("input[name='discountCode']:checked").length !== 0) {
					$('#discountCode-use').removeClass('disabled');
				} else {
					$('#discountCode-use').addClass('disabled');
				}
			})
		discountCodeUseBind();
	}
	//æŒ‰ä¸‹æœ‰æŠ˜æ‰£ç¢¼åˆ—è¡¨çš„ä½¿ç”¨ç¶ è‰²æŒ‰éˆ•æ™‚
	function discountCodeUseBind() {
		if (discountCode.layout === 'MWEB') {
			$('.G-ezModal-modal-close-btn').addClass('back');
			$(document)
				.on("click.ezModal-event", ".rwd .ezModal-discount .coupon.apply label", function () {
					$('#' + $(this).attr('for')).prop('checked', true);
					discountCodeUse();
				});
		} else {
			$('.G-ezModal-modal-close-btn').addClass('discountCode-close');
			$(document)
				.on("click.ezModal-event", "#ezModal-main #discountCode-use", discountCodeUse);
		}
	}
	function bindEvent(status, page, prodData) {
		if (status == "off") {
			$(document).off(".ezModal-event");
		} else {
			$(document).off(".ezModal-event");
			allPageBind();
			switch (page) {
				case "discountCode":
					discountCodeBind(prodData);
					break;
			}
		}
	}
	function discountCodeUse() {
		var cacheKey = discountCode.key;
		discountCode.selectedDiscountCode = !(discountCode.requestFrom === 'APP') ? $("input[name='discountCode']:checked").attr('value') : discountCode.selectedDiscountCode;
		//åœ¨appåº•ä¸‹ä¸æœƒæ‰“é–‹ç‡ˆç®± æœ‰æ›´æ–°discountCode.selectedDiscountCodeæ‰é€²è¡Œä¸‹ä¸€æ­¥
		if (discountCode.selectedDiscountCode === undefined && discountCode.ezModal) {
			if (window.event.target.className.indexOf('G-ezModal-modal-close-btn') > -1) {
				if (ezModal_layoutEnv() === 'MWEB') { discountCode.hideModal(); }
				discountCode.hide();
			}
			return;
		}
		discountCode.selected = true;
		var validDiscount = discountCode.cache[cacheKey].valid;
		var selectedArr = validDiscount.filter(function (item, i, arr) {
			return item.code === discountCode.selectedDiscountCode;
		})
		var discountComponent = $('discount-component'),
			discountCodeTitle = selectedArr[0].projName,
			discountCodeProjNo = selectedArr[0].projNo,
			discountCodeId = 'checkDiscount' + selectedArr[0].code + '',
			discountValue = selectedArr[0].code,
			favourablePrice = selectedArr[0].discountPrice,//æŠ˜æ‰£å¾Œçš„é‡‘é¡
			minus = selectedArr[0].totalSave;//ç¸½å…±æ¸›åƒ¹
		if (document.querySelector('discount-component')) {
			document.querySelector('discount-component').selectedDiscount = discountCodeTitle;
			setTimeout(function () { document.querySelector('discount-component').minus = selectedArr[0].totalSave; }, 100)
			document.querySelector('discount-component').setAttribute('selected', discountCodeId);//ç‡ˆç®±æŠ˜æ‰£ç¢¼input-id
			discountComponent.attr({
				'discount-code': discountValue,//æŠ˜æ‰£ç¢¼çš„discountCode(äº‚æ•¸13ç¢¼)
				'favourable-price': favourablePrice,//æŠ˜æ‰£å¾Œçš„é‡‘é¡
				'proj-no': discountCodeProjNo
			});
		}

		discountCode.selectedDiscountCode = discountValue;
		if (discountCode.cache[cacheKey].valid.length > 0 && discountCode.selectedDiscountCode !== '') {
			discountCode.missDiscount = false;
		}
		var storeData = {};
		storeData.discountCode = discountValue;
		storeData.projName = discountCodeTitle;
		storeData.projNo = discountCodeProjNo;
		storeData.favourablePrice = favourablePrice;
		storeData.minus = minus;
		storeData.selectedID = discountCodeId;
		storeData = discountCodeTitle ? storeData : {};
		refreshProdData(storeData);
		if (discountCode.ezModal) {
			if (ezModal_layoutEnv() === 'MWEB') { discountCode.hideModal(); }
			discountCode.hide();
		};
	}
	var refreshProdData = function (storeData) {
		discountCode.callback(storeData);
	}
	function discountCodeCheckForm(prodData) {
		var e = window.event;
		e.preventDefault();//å–æ¶ˆé è¨­
		clearError("ALL");//æ¸…é™¤æ‰€æœ‰éŒ¯èª¤æ¬„ä½
		var valDiscountCode = $.trim($("#ezModal-main-discountCode").val());
		if (valDiscountCode == "") {
			setErrorrHtml("ezModal-main-discountCode", "è«‹è¼¸å…¥æŠ˜æ‰£ç¢¼", "change_blank");
			$('.input-group-cover').addClass('error');
			return true;
		}
		//$(".ezModal-error-input input").eq(0).trigger("focus");
		if ($("#ezModal-main .ezModal-main-discountCode .ezModal-error-input").length === 0) {
			changeInputStatToLoading();
			getDiscountCode(prodData);
		}
	}
	function clearError(id, fade) {
		if (id === "ALL") {
			$(".ezModal-error-input:not(.noClear)").removeClass("ezModal-error-input").closest(".ezModal-input-group").removeClass("ezModal-error");
			$(".ezModal-error-msg").hide();
			$(".ezModal-error-msg:not(.noClear)").remove();
		} else {//æŒ‡å®šid
			$(".input-group-cover").removeClass('error');
			$("#" + id).closest(".ezModal-error-input").removeClass("ezModal-error-input").closest(".ezModal-input-group").removeClass("ezModal-error");
			if (fade === "fade") {
				$("#" + id + "_error").fadeOut(150);
			} else {
				$("#" + id + "_error").hide();
			}
		}
	}
	function setErrorrHtml(id, text, change_blank) {
		changeBtnStatToNormal();
		$this = $("#" + id + "").closest('.input-group-cover');
		$("#" + id + "_error").remove();//å…ˆæŠŠåŽŸå…ˆçš„ç§»é™¤
		if (text) $this.after("<div id='" + id + "_error' class='ezModal-error-msg' >" + text + "</div>");//éŒ¯èª¤è¨Šæ¯çš„html

		if (id == "ezModal-captcha-response") $("#ezModal-captcha-response_error").css("width", "290px");
		if (typeof (change_blank) == "string") {
			if (change_blank.indexOf("change_blank") > -1) {//ä»£è¡¨è®Šæ›´æ¬„ä½è¦ç§»é™¤éŒ¯èª¤
				setTimeout(function () {
					$("#" + id).off("input.ezModal-setErrorr").on("input.ezModal-setErrorr", function () {
						typeof jQuery === "function"
							? clearError(id, "fade")//ç¬¬äºŒå€‹åƒæ•¸å¯åŠ fade
							: clearError(id)
						$(this).off("input.ezModal-setErrorr");
					})
				}, 5);
			}
		}
		// $("#" + id + "_error").show();
		$("#" + id + "").parent().addClass("ezModal-error-input").closest(".ezModal-input-group").addClass("ezModal-error");//éŒ¯èª¤è¨Šæ¯åŠ åˆ°ä»–çš„ä¸Šä¸€å±¤å’Œinput-group
	}
	function checkSelected() {
		if (discountCode.selectedDiscountCode !== '') {
			var id = 'checkDiscount' + discountCode.selectedDiscountCode
			$("#" + id).prop('checked', true);
			discountCode.selectedInput = id
			if ($("input[name='discountCode']:checked").length !== 0) {
				$('#discountCode-use').removeClass('disabled');
			} else {
				$('#discountCode-use').addClass('disabled');
			}
		} else {
			return false;
		}
	}
	function MWEBAlert() {
		try {
			var $alert = document.querySelector('.mweb-alert');
			$alert.parentElement.removeChild($alert);
		} catch ($error) { }
		var $alert = document.createElement('div');
		$alert.classList.add('blurBackground')
		$alert.innerHTML = '<div class="mweb-alert"><div class="inner"><div class="text">' + arguments[0] + '</div></div><div class="button" id="useDiscountCode">' + arguments[1] + '</div></div>';
		document.querySelector('body').appendChild($alert);
		if (discountCode.ezModal) {
		document.querySelector('#' + discountCode.ezModal.G_id).style.filter = 'blur(10px)';
	}
		setTimeout(function () {
			document.querySelector('.mweb-alert .button:last-child').addEventListener("click", function () {
				if (this.innerText == 'é¦¬ä¸Šä½¿ç”¨') {
					if (discountCode.multipleApply === true) {//æœ‰å¤šç­†é©ç”¨çš„æƒ…å½¢é¸å–é ˜å–æœ€å„ªæƒ 
						$('#checkDiscount' + discountCode.best.code).prop('checked', true);
					} else {
						$('input[type="radio"]').first().prop('checked', true);
					}
					discountCodeUse();
				}
				$alert.parentElement.removeChild($alert);
				if (discountCode.ezModal) {
					document.querySelector('#' + discountCode.ezModal.G_id).style.filter = '';
				}
			});
		});
		return false;
	}
	function newEzModal() {
		cachedScript(SOURCE_REF + 'assets/jslib/ezLogin.js', function () {
			cachedScript(SOURCE_REF + 'assets/jslib/ezModal.js', function () {//è¼‰å…¥modal js
				!discountCode.ezModal ? discountCode.ezModal = new EzModal({
					id: "ezModal-main",
					onHidden: function () {
						bindEvent("off");
						checkPCRwd();
					}
				}) : discountCode.ezModal;
			});
		});
	}
	this.moveWithDiscountModal = function (data, value, prodData, callback) {
		discountCode.ezModal.moveModal(withDiscountModalBlock(data, value), "auto");
		if (data.length < 5) {
			$('.couponList.owner').addClass('overflowReset');
		}
		if (data.length == 1) {
			if (callback) { callback(); }
		}
		bindEvent("on", "discountCode", prodData);
		checkSelected();
		$('#discountSubmit').hide();
	}
	this.moveMWEBWithDiscountModal = function (data, value, prodData) {
		discountCode.ezModal.moveModal(MWEBWithDiscountModalBlock(data, value), '');
		$('.G-ezModal-modal-dialog').css('width', '')
		bindEvent("on", "discountCode", prodData);
		checkSelected();
	}
	this.moveMWEBErrorDiscountModal = function (data) {
		var alertMsg = '', button = "ç¢ºèª";
		if (data.code !== "04") { alertMsg = 'é ˜å–å¤±æ•—' }
		if (data.code == "04") { alertMsg = 'æ‚¨å·²é ˜å–éŽæ­¤å„ªæƒ ' }
		if (data == 'success') {
			alertMsg = 'é ˜å–æˆåŠŸï¼Œæ³¨æ„ä¿å­˜æœŸé™!';
			button = 'é¦¬ä¸Šä½¿ç”¨';
		}
		MWEBAlert(alertMsg, button);
	}
	this.moveEmptyDiscountModal = function (prodData) {
		bindEvent("on", "discountCode", prodData);
		discountCode.ezModal.moveModal(emptyDiscountModalBlock(), "388px");
		$('.ezModal-buttonBlock').hide();
	}

	this.moveErrorDiscountModal = function (data) {
		discountCode.ezModal.moveModal(errorDiscountModal(data), "326px");
	}
	this.moveBusyDiscountModal = function () {
		discountCode.ezModal.moveModal(busyDiscountModal(), "297px");
	}
	this.hide = function () {
		discountCode.ezModal.hide();
	}
	/**
	 * é¡¯ç¤ºå®Œæˆçš„Modal
	 * obj:data, page, value, prodData,callback,inputOne
	 */
	function showDiscountCodeModal(obj) {
		$('.G-ezModal').removeClass('open');

		var pages = {
			withDiscount: function (obj) {
				discountCode.moveWithDiscountModal(obj.data, obj.value, obj.prodData, obj.callback)
			},
			empty: function (obj) {
				discountCode.moveEmptyDiscountModal(obj.prodData)
			},
			MWEB: function (obj) {
				discountCode.moveMWEBWithDiscountModal(obj.data, obj.value, obj.prodData)
			},
			busy: function () {
				discountCode.moveBusyDiscountModal()
			},
			error: function (obj) {
				discountCode.moveErrorDiscountModal(obj.data)
			},
			MWEBError: function (obj) {
				discountCode.moveMWEBErrorDiscountModal(obj.data)
			}
		}
		pages[obj.page](obj);

		setTimeout(function () {
			window.discountCodeCheck = false; //modalè¨­ç‚ºé—œé–‰ 
			discountCode.ezModal.show();
		}, 5);
	}
	/**
	 * ç¢ºèªæ—¥æœŸ
	 * @param {*} time å‚³å…¥æ­¸æˆ¶æ™‚é–“ 
	 */
	function in24hours(time) {
		time = time.replace(new RegExp(/-/gm), "/");
		var claimTime, claimTimestamp, currentTimestamp;
		claimTime = time.substring(0, time.length - 5);
		claimTimestamp = (Date.parse(new Date(claimTime))) / 1000;
		currentTimestamp = (Date.parse(new Date())) / 1000;
		if ((parseInt(currentTimestamp) - parseInt(claimTimestamp)) > 24 * 60 * 60) {
			return false;
		} else {
			return true;
		}
	}
	function findMostDiscount(data) {//ç‚ºæŠ˜æ‰£ç¢¼åˆ—è¡¨è³‡æ–™
		var hint = Math.max.apply(null, data.map(function (o) {
			return o.totalSave;
		}));
		return hint;
	}
	function flatNotApplyDiscountCode(data) {//ç‚ºæœƒå“¡æ‰€æœ‰çš„æŠ˜æ‰£ç¢¼åˆ—è¡¨å›žå‚³
		var type = [], discountType, discountValue;
		data.forEach(function (item, index) {
			discountValue = item.discountType === 'PERCENTAGE' ? ((100 - parseInt(item.discountValue)) / 10).toString() : item.discountValue;
			type.push({
				code: item.discountCode,
				projName: item.projName,
				projNo: item.projNo,
				discountValue: discountValue,
				discountType: item.discountType,
				minOrderPrice: item.minOrderPrice,
				orderDtExpires: item.orderDtExpires == null ? '- -' : item.orderDtExpires.slice(0, 10),
				orderDtBegins: item.orderDtBegins == null ? 'å³æ—¥èµ·' : item.orderDtBegins.slice(0, 10),
				projRemark: item.projRemark,
				isNew: in24hours(item.claimDt)
			})
			if (item.exposeLimit == 'APP') { type[index].appOnly = true };
		})
		return type;
	}
	function flatDiscountList(data) {
		var coupon = {}, type = [];
		coupon.valid = [];
		coupon.invalid = [];
		data.forEach(function (item, index) {
			var price = 0, discountPrice = 0, minus = 0, discountType, discountValue;
			discountValue = item.coupons[0].discountType === 'PERCENTAGE' ? ((100 - parseInt(item.coupons[0].discountValue)) / 10).toString() : item.coupons[0].discountValue;
			for (i = 0; i < item.coupons.length; i++) {
				price += item.coupons[i].price;
				discountPrice += item.coupons[i].favourablePrice;
				minus = price - discountPrice;
			}
			type.push({
				code: item.code,
				projName: item.coupons[0].projName,
				projNo: item.coupons[0].projNo,
				discountValue: discountValue,
				discountType: item.coupons[0].discountType,
				minOrderPrice: item.coupons[0].minOrderPrice,
				totalSave: minus,
				originalPrice: price,
				discountPrice: discountPrice,
				orderDtExpires: item.coupons[0].orderDtExpires == null ? '- -' : item.coupons[0].orderDtExpires.slice(0, 10),
				orderDtBegins: item.coupons[0].orderDtBegins == null ? 'å³æ—¥èµ·' : item.coupons[0].orderDtBegins.slice(0, 10),
				projRemark: item.coupons[0].projRemark,
				isNew: in24hours(item.coupons[0].claimDt)
			})
			if (item.coupons[0].channel === 'APP') { type[index].appOnly = true };
			coupon.valid = type;
			coupon.invalid = [];
		})
		return coupon;
	}
	function discountMap(data) {
		var types = [],
			coupons = [];
		data.forEach(function (value, index, array) {
			if (types.indexOf(value.discountCode) === -1) {//ç•¶typesä¸­æ²’æœ‰é€™å¼µæŠ˜æ‰£ç¢¼çš„æ™‚å€™push
				types.push(value.discountCode);
			}
		});
		types.forEach(function (value, index, array) {
			data.forEach(function (val, i, a) {
				if (val.discountCode === value) {
					coupons.push({
						"discountCode": val.discountCode,
						"favourablePrice": val.favourablePrice,
						"price": val.price,
						"prodSeqno": val.prodSeqno,
						"projNo": val.projNo,
						"projName": val.projName,
						"discountType": val.discountType,
						"discountValue": val.discountValue,
						"minOrderPrice": val.minOrderPrice,
						"orderDtBegins": val.orderDtBegins,
						"orderDtExpires": val.orderDtExpires,
						"channel": val.channel,
						"projRemark": val.projRemark,
						"claimDt": val.claimDt
					});
				}
			});
			array[index] = {
				"code": value,
				"coupons": coupons
			};
			coupons = [];
		});
		return { types: types };
	}
	function importScript(url, type, callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		type == 'nomodule' ? script.nomodule = true : script.type = type;
		script.onload = script.onreadystatechange = function () {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				if (callback) { callback(); }
				script.onload = script.onreadystatechange = null;
			}
		};
		script.src = url;
		head.appendChild(script);
	}
	function initializeDiscountComponent(options) {
		discountCode.productData = options;
		discountCode.callback = options.callback;
		discountCode.apiSuccess = options.apiSuccess;
		discountCode.selectedDiscountCode = '';
		discountCode.layout = ezModal_layoutEnv();
		var cacheKey = JSON.stringify(options);
		discountCode.key = cacheKey;

		if (options.isHybrid) {
			discountCode.requestFrom = "APP";
			options.requestFrom = discountCode.requestFrom;
			discountCode.custNo = options.custNo;
			discountCode.key = JSON.stringify(options);
			var initData = {
				prodData: options,
			}
			callAvailableDiscountForProd(initData)
		} else {
			var dataUrl = ApiEndpointConfig.COMMON_USERAUTH_ENDPOINT + 'auth/isLogin';

			$.ajax({
				url: dataUrl,
				type: "GET",
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					var roles = ['B2C', 'B2E', 'B2F', 'B2B'];
					if (roles.indexOf(data.role) > -1) {//æª¢æŸ¥ç™»å…¥èº«åˆ†//è¼‰å…¥çµ„ä»¶
						if (options.hiddenDiscountComponent === true || options.env === 'VUE_PC') {
						} else {
							importScript(SOURCE_REF + 'assets/jslib/discountComponent/discount-component/discount-component.js', 'nomodule', function () {
								importScript(SOURCE_REF + 'assets/jslib/discountComponent/discount-component/discount-component.esm.js', 'module');
							});
						}

						newEzModal();
						try {
							document.domain = 'eztravel.com.tw';
						} catch (e) {
							console.error("Hi there, We detect your web site look like not our eztravel.com.tw domain. It may be error, thanks");
						}
						if (document.querySelector('discount-component')) {
							if (document.querySelector('discount-component').selected != null) refreshProdClear();
						}
						if (options && !discountCode.cache[cacheKey]) {
							var initData = {
								prodData: options
							}
							callAvailableDiscountForProd(initData)
						} else if (typeof (discountCode.apiSuccess) === "function" && discountCode.cache[cacheKey]) {
							discountCode.apiSuccess(discountCode.cache[cacheKey]);
							if (discountCode.cache[cacheKey].valid.length > 0) {
								discountCode.missDiscount = true;
							}
						}
					} else {
						if ($('discount-component')) $('discount-component').hide();
					}
				}
			});
		}
	}
	this.__EzInH5PluginBridge_callback = function () {
		var cacheKey = discountCode.key;
		var discountData = JSON.parse(arguments[0])
		try {
			if (discountData.param.discountList) {//æ­¸æˆ¶æŠ˜æ‰£ç¢¼-->åˆ·æ–°åˆ—è¡¨
				discountCode.cache[cacheKey].valid = discountData.param.discountList ? discountData.param.discountList.valid : discountCode.cache[cacheKey].valid;
				hint = findMostDiscount(discountData.param.discountList.valid);
				discountCode.cache[cacheKey].hint = 'æœ€é«˜-' + hint;
				if (typeof (discountCode.apiSuccess) == "function") {
					discountCode.apiSuccess(discountCode.cache[cacheKey])
				}
			}
			discountCode.selectedDiscountCode = discountData.param.discount ? discountData.param.discount : discountCode.selectedDiscountCode;
			discountCodeUse();

		} catch (error) {
			console.log(error)
		}
	}
	window.__EzInH5PluginBridge_callback = this.__EzInH5PluginBridge_callback;
	this.showModal = function () {
		discountCodes()
	}
	this.hideModal = function () {
		if (discountCode.ezModal) {
			$('#' + this.ezModal.G_id).modal('hideModal')
		} else {
			if ($('.G-ezModal-modal-close-btn')) {
				$('.G-ezModal-modal-close-btn').trigger('click').trigger('click')
			}
		}
	}
	function discountCodes() {
		options = arguments[0] || discountCode.productData;
		var cacheKey = JSON.stringify(options);
		if (options.isHybrid) {
			var prodData = {
				custNo: options.custNo,
				conditionAnswers: options.conditionAnswers,
				price: options.price,
				products: options.products,
				requestFrom: discountCode.requestFrom
			}
			data = {
				"action": "bookingDiscountListPage",
				"callback_tagname": "discountUpdate",
				"discountList": discountCode.cache[cacheKey],
				"selectedCode": discountCode.selectedDiscountCode,
				"data": prodData
			}
			if (discountCode.productData.tid) data.tid = discountCode.productData.tid
			try {
				if (options.isAndroid === true) {
					window.EzInH5Plugin.bookingDiscountListPage(JSON.stringify(data))
				} else {
					webkit.messageHandlers.EzInH5Plugin.postMessage(JSON.stringify(data))
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			newEzModal();
			if (window.discountCodeCheck === true) return;//ä»£è¡¨modalå·²ç¶“é–‹å•Ÿï¼Œé›¢é–‹
			window.discountCodeCheck = true; //å°‡modal è¨­ç‚ºé–‹å•Ÿ
			try {
				result = discountCode.cache[cacheKey].valid;
				newMap = discountCode.cache[cacheKey].valid;
				if (discountCode.layout === 'PC') {
					checkPCRwd();
					if (result.length === 0) {
						var empty = {
							data: result,
							page: 'empty',
							prodData: options
						}
						showDiscountCodeModal(empty);
						return;
					} else {
						var withDiscount = {
							data: result,
							page: 'withDiscount',
							value: newMap,
							prodData: options
						}
						showDiscountCodeModal(withDiscount);
					}
				} else {
					$('html').addClass('rwd');
					var MwebDiscount = {
						data: result,
						page: 'MWEB',
						value: newMap,
						prodData: options
					}
					showDiscountCodeModal(MwebDiscount);
				}
			} catch (error) {
				if (discountCode.layout === 'MWEB') {
					$('html').addClass('rwd');
					$('.G-ezModal-modal-dialog').css('width', '')
				}
				var busy = {
					page: 'busy'
				}
				if (discountCode.ezModal) { showDiscountCodeModal(busy); } else {
					window.discountCodeCheck = false;
				}
			}
		}
	}
	function handleEnter() {
		$('.dropdownBackground').empty();
		this.classList.add('trigger-enter');
		var that = this
		setTimeout(function () {
			that.classList.contains('trigger-enter') && that.classList.add('trigger-enter-active')
		}, 150);
		$('.dropdownBackground').addClass('open');

		var discountCodeInfo = this.querySelector('.discountCodeInfo'),
			detail = discountCodeInfo.cloneNode(true),
			dropdownCoords = discountCodeInfo.getBoundingClientRect(),
			inputRect = document.querySelector('#ezModal-main-discountCode').getBoundingClientRect(),
			background = document.querySelector('.dropdownBackground');
		if (document.querySelector('#ezModal-main-discountCode')) {
			var coords = {
				height: dropdownCoords.height,
				width: dropdownCoords.width,
				top: dropdownCoords.top - inputRect.top + 10,
				left: dropdownCoords.left - inputRect.left
			};
		}
		background.style.setProperty('width', coords.width + 'px');
		background.style.setProperty('height', coords.height + 'px');
		$('.dropdownBackground').css('transform', 'translate(' + coords.left + 'px, ' + coords.top + 'px)')
		if (!(background.querySelector('.discountCodeInfo'))) {
			background.appendChild(detail);
			$('.G-ezModal').addClass('open');
		}
	}
	function handleLeave(e) {
		this.classList.remove('trigger-enter', 'trigger-enter-active');
		e.target.parentNode.parentNode.classList.remove('trigger-enter', 'trigger-enter-active');
		$('.couponList').on('scroll', function () {
			$('.G-ezModal').removeClass('open');
			$('.dropdownBackground').empty().removeClass('open');
		});
	}
	$(document).on('mouseenter', '.detailBlock > li', handleEnter).on('mouseleave', '.detailBlock > li', handleLeave);
	$(document).on('mouseleave', '.dropdownBackground', function () {
		$('.G-ezModal').removeClass('open');
		$('.dropdownBackground').empty().removeClass('open');
	})
	$(document).on('click', '.ezModal-main-discountCode input[type="radio"]', function () {
		if (this.id == discountCode.selectedInput) {
			this.checked = false;
			discountCode.selectedInput = null;
		} else {
			discountCode.selectedInput = this.id;
		}
	})
	$('body').on('click', '.discountCodeInfo > .close-btn', function () {
		$('.G-ezModal').removeClass('open');
		$('.dropdownBackground').empty().removeClass('open');
	});
	if (ezModal_layoutEnv() === 'MWEB') {
		window.addEventListener('resize', function () {
			if (document.activeElement.tagName === 'INPUT') {
				window.setTimeout(function () {
					document.querySelector('.G-ezModal').scrollTop = 0
				}, 0);
			}
		})
		$(document).on('focus', '#ezModal-main-discountCode', function () {
			document.querySelector('.G-ezModal').scrollTop = 0
		})
		$(document).on('focus', '#ezModal-main-discountCode', function () {
			if ($('#ezModal-main .input-box .close-btn').css('display') == 'none') {
				$('#ezModal-main .input-box .close-btn').css('display', 'inline-block');
			}
		})
		$(document).on('blur', '#ezModal-main-discountCode', function () {
			if ($('#ezModal-main-discountCode').val() == '') {
				$('#ezModal-main .input-box .close-btn').hide();
				$('#discountSubmit').css('background-color', '');
			}
		})
		$(document).on('click', '#ezModal-main .input-box .close-btn', function () {
			$('#ezModal-main-discountCode').val('');
			$('#ezModal-main .input-box .close-btn').hide();
		})
	}
	$(document).on('keydown focus', '#ezModal-main-discountCode', function () {
		if ($('#discountSubmit').css('display') == 'none') {
			$('#discountSubmit').show();
		}
		$('#discountSubmit').css('background-color', '#55d040');
	})
	$(document)
		.on('input', '#ezModal-main-discountCode', function () {
			$('#discountSubmit').css('background-color', '#55d040')
		})
		.on('input', '#ezModal-main-discountCode', function () {
			if (ezModal_layoutEnv() == 'MWEB') {
				$('#discountSubmit').css('background-color', '#55d040');
			}
			else {
				if (window.ActiveXObject || "ActiveXObject" in window) {
					$('#discountSubmit').show();
				} else {
					if ($(this).val() == '') { $('#discountSubmit').hide(); }
				}
			}
		})
	var doFunction = function () { };
	if (typeof jQuery === "function") { // jQuery
		$.extend({
			discountCodes: function (options) {
				discountCodes(options)
			},
			initDiscountComponent: function (options) {
				initializeDiscountComponent(options)
			},
			missDiscount: function () {
				return discountCode.missDiscount;
			}
		});
		doFunction = $.discountCodes || $.initDiscountComponent || $.missDiscount;
	} else { // Zepto
		$.extend($.fn, {
			discountCodes: function (options) {
				discountCodes(options)
			},
			initDiscountComponent: function (options) {
				initializeDiscountComponent(options)
			},
			missDiscount: function () {
				return discountCode.missDiscount;
			}
		});
		doFunction = $.fn.discountCodes || $.fn.initDiscountComponent || $.fn.missDiscount;
	}
}(jslib));
var refreshProdClear = function () {
	if (document.querySelector('discount-component')) {
		var _discountComponent = document.querySelector('discount-component');
		if (_discountComponent.selected) {
			_discountComponent.setAttribute('selected', '');
			_discountComponent.setAttribute('selected-discount', '');
			_discountComponent.setAttribute('discount-code', '');
			_discountComponent.setAttribute('favourable-price', '');
			_discountComponent.setAttribute('minus', '');
			_discountComponent.setAttribute('reset', 'noNeed');
		}
	}
	discountCode.selected = false;
	discountCode.selectedDiscountCode = '';
	discountCode.missDiscount = true;
	discountCode.selectedInput = null;
	var storeData = {};
	discountCode.callback(storeData);
}