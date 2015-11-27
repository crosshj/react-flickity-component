var isBrowser = (typeof window !== 'undefined');
var Flickity = require('flickity');
var imagesloaded = isBrowser ? require('imagesloaded') : null;
var refName = 'carousel';

function FlickityComponent(React){
    return React.createClass({

        getInitialState: function() {
            return {
                selectedIndex: 0
            }
        },

        getDefaultProps: function() {
            return {
                disableImagesLoaded: false,
                options: {},
                className: '',
                elementType: 'div'
            };
        },

        updateSelected: function() {
            var index = this.flkty.selectedIndex;
            this.setState({
                selectedIndex: index
            });
        },

        componentWillUnmount: function() {
            if (this.flkty) {
                this.flkty.off('cellSelect', this.updateSelected);
                this.flkty.destroy();
            }
        },

        imagesLoaded: function() {
            if (this.props.disableImagesLoaded) return;
            imagesloaded(
                this.refs[refName],
                function(instance) {
                    this.flkty.reloadCells();
                }.bind(this)
            );
        },
        
        componentDidMount: function() {
            var carousel = this.refs[refName];

            this.flkty = new Flickity(carousel, this.props.options);
            this.flkty.on('cellSelect', this.updateSelected);
            this.imagesLoaded();
        },

        render: function() {
            return React.createElement(this.props.elementType, {
                    className: this.props.className,
                    ref: refName
                }, this.props.children);
        }
    })
}

module.exports = FlickityComponent;