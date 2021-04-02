const locale = $('[locale]').attr('locale')
const currency = $('[currency]').attr('currency')
const moneyFormat = new Intl.NumberFormat(locale);
const formatMoney = (number) => {
	return moneyFormat.format(number);
};

export const checkoutEdit = () => {
	$('.formTourSearchItem').each(function () {
		const _this = $(this);
		const btnEdit = _this.find('.formTourSearchItem__editButton');
		const quantityElement = _this.find('.formItem__quantity');
		const unitPrice = parseInt(quantityElement.attr('data-unit-price'));
		const total = _this.find('.formTourSearchItem__price');
		let val;
		btnEdit.on('click', function () {
			val = 0;
			quantityElement.val(val);
			total.html(formatMoney(val * unitPrice));
			quantityElement.removeAttr('disabled');
			quantityElement.val(0);
			quantityElement.focus();
			quantityElement.select();
		});
		quantityElement.on('keydown', function (e) {
			val = quantityElement.val();
			if (e.keyCode == 8) {
				if(quantityElement.val() == 0) {
					e.preventDefault();
				}
				val = 0;
				quantityElement.val(val);
				total.html(formatMoney(val * unitPrice));
			} else {
				e.preventDefault();
			}
		});
		quantityElement.on('keyup', function (e) {
			e.preventDefault();
			if (isNaN(e.key)) {
				quantityElement.val(val);
			} else {
				val = parseInt(val.toString() + e.key.toString());
				if (val > 20) {
					val = 20;
				}
				if (val < 0) {
					val = 0;
				}
				if (val <= 20 && val >= 0) {
					val = val;
				}
				quantityElement.val(val);
			}
			
			total.html(formatMoney(val * unitPrice));
		});
		quantityElement.on('blur', function () {
			quantityElement.attr('disabled', 'disabled');
		});
	});
};
