/**
 * Provides a UI label entity. Basic on-screen text label.
 */
var IgeUiLabel = IgeUiElement.extend({
	classId: 'IgeUiLabel',

	/**
	 * @constructor
	 */
	init: function () {
		IgeUiElement.prototype.init.call(this);

		var self = this;

		this._value = '';

		this._fontEntity = new IgeFontEntity()
			.left(0)
			.middle(0)
			.textAlignX(0)
			.textAlignY(0)
			.mount(this);
	},

	/**
	 * Extended method to auto-update the width of the child
	 * font entity automatically to fill the text box.
	 * @param px
	 * @param lockAspect
	 * @param modifier
	 * @param noUpdate
	 * @return {*}
	 */
	width: function (px, lockAspect, modifier, noUpdate) {
		var val;

		// Call the main super class method
		val = IgeUiElement.prototype.width.call(this, px, lockAspect, modifier, noUpdate);

        this._fontEntity.width('100%', false, 0, noUpdate);

		return val;
	},

	/**
	 * Extended method to auto-update the height of the child
	 * font entity automatically to fill the text box.
	 * @param px
	 * @param lockAspect
	 * @param modifier
	 * @param noUpdate
	 * @return {*}
	 */
	height: function (px, lockAspect, modifier, noUpdate) {
		var val;

		// Call the main super class method
		val = IgeUiElement.prototype.height.call(this, px, lockAspect, modifier, noUpdate);

		// Update the font entity height
		this._fontEntity.height('100%', false, 0, noUpdate);

		return val;
	},

	/**
	 * Gets / sets the text value of the input box.
	 * @param {String=} val The text value.
	 * @return {*}
	 */
	value: function (val) {
		if (val !== undefined) {
			if (this._value !== val) {
				this._value = val;
	
				if (!val && this._placeHolder) {
					// Assign placeholder text and color
					this._fontEntity.text(this._placeHolder);
					this._fontEntity.color(this._placeHolderColor);
				} else {
					// Set the text of the font entity to the value
					if (!this._mask) {
						// Assign text directly
						this._fontEntity.text(this._value);
					} else {
						// Assign a mask value instead
						this._fontEntity.text(new Array(this._value.length + 1).join(this._mask))
					}
					this._fontEntity.color(this._color);
				}
				
				this.emit('change', this._value);
			}
			return this;
		}

		return this._value;
	},

	/**
	 * Gets / sets the current horizontal text alignment. Accepts
	 * a value of 0, 1 or 2 (left, centre, right) respectively.
	 * @param {Number=} val
	 * @returns {*}
	 */
	textAlignX: function (val) {
        if (val !== undefined) {
			this._fontEntity.textAlignX(val);
			return this;
		}
		
		return this._fontEntity.textAlignX();
	},

	/**
	 * Gets / sets the current vertical text alignment. Accepts
	 * a value of 0, 1 or 2 (top, middle, bottom) respectively.
	 * @param {Number=} val
	 * @returns {*}
	 */
	textAlignY: function (val) {
        if (val !== undefined) {
			this._fontEntity.textAlignY(val);
			return this;
		}
		
		return this._fontEntity.textAlignY();
    },
    
	/**
	 * Gets / sets the auto-wrapping mode. If set to true then the
	 * text this font entity renders will be automatically line-broken
	 * when a line reaches the width of the entity.
	 * @param val
	 * @returns {*}
	 */
	autoWrap: function (val) {
        if (val !== undefined) {
			this._fontEntity.autoWrap(val);
			return this;
		}
		
		return this._fontEntity.autoWrap();
    },
        
	/**
	 * Gets / sets the font sheet (texture) that the text box will
	 * use when rendering text inside the box.
	 * @param fontSheet
	 * @return {*}
	 */
	fontSheet: function (fontSheet) {
		if (fontSheet !== undefined) {
			this._fontSheet = fontSheet;

			// Set the font sheet as the texture for our font entity
			this._fontEntity.texture(this._fontSheet);
			return this;
		}

		return this._fontSheet;
	},
	
	font: function (val) {
		if (val !== undefined) {
			if (typeof(val) === 'string') {
				// Native font name
				return this.nativeFont(val);
			} else {
				// Font sheet
				return this.fontSheet(val);
			}
		}
		
		if (this._fontEntity._nativeMode) {
			// Return native font
			return this.nativeFont();
		} else {
			// Return font sheet
			return this.fontSheet();
		}
	},
	
	nativeFont: function (val) {
		if (val !== undefined) {
			this._fontEntity.nativeFont(val);
			return this;
		}
		
		return this._fontEntity.nativeFont();
	},
	
	nativeStroke: function (val) {
		if (val !== undefined) {
			this._fontEntity.nativeStroke(val);
			return this;
		}
		
		return this._fontEntity.nativeStroke();
	},
	
	nativeStrokeColor: function (val) {
		if (val !== undefined) {
			this._fontEntity.nativeStrokeColor(val);
			return this;
		}
		
		return this._fontEntity.nativeStrokeColor();
	},
	
	color: function (val) {
		if (val !== undefined) {
			this._color = val;
			
			if (!this._value && this._placeHolder && this._placeHolderColor) {
				this._fontEntity.color(this._placeHolderColor);
			} else {
				this._fontEntity.color(val);
			}
			return this;
		}
		
		return this._color;
	},
	
	/**
	 * Gets / sets the current height of a text line in pixels. 
     * Choose a bigger value for bigger font sizes.
	 * @param {Number=} val
	 * @returns {*}
	 */
	textLineSpacing: function (val) {
        if (val !== undefined) {
			this._fontEntity.textLineSpacing(val);
			return this;
		}
		
		return this._fontEntity.textLineSpacing();
    },

	_mounted: function () {
		// Check if we have a text value
		if (!this._value && this._placeHolder) {
			// Assign placeholder text and color
			this._fontEntity.text(this._placeHolder);
			this._fontEntity.color(this._placeHolderColor);
		}
		
		IgeUiElement.prototype._mounted.call(this);
	}
});