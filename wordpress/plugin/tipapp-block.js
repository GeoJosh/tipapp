wp.blocks.registerBlockType('tipapp/tip-button', {
    title: 'TipApp Button',
    icon: 'button',
    category: 'common',
    attributes: {
        button_label: {
            type: 'string'
        },
        api_base: {
            type: 'string'
        },
    },
    example: {
      attributes: {
        button_label: 'Tip Northshore',
        api_base: 'https://tipnorthshore.net',
      },
    },      
    edit: function(props) {
        function updateApiBase(event) {
            props.setAttributes({
                api_base: event.target.value
            });
        }

        function updateButtonLabel(event) {
            props.setAttributes({
                button_label: event.target.value
            });
        }

        return React.createElement('div', null,
            React.createElement('div', null,
                React.createElement('button', { class: 'tipapp-action-button tipapp-action-button-block' }, 'TipApp Button'),
            ),
            React.createElement('div', null, 
                React.createElement('label', { for: 'api_base' }, 'TipApp URL'),
                React.createElement('br', null),
                React.createElement(
                    'input',
                    {
                        type: 'text',
                        name: 'api_base',
                        value: props.attributes.api_base,
                        onChange: updateApiBase
                    }
                ),
            ),
            React.createElement('div', null, 
                React.createElement('label', { for: 'button_label' }, 'Button Label'),
                React.createElement('br', null),
                React.createElement(
                    'input',
                    {
                        type: 'text',
                        name: 'button_label',
                        value: props.attributes.button_label,
                        onChange: updateButtonLabel
                    }
                ),
            )
        );
    },
    save: function(props) {
            return wp.element.createElement('div', { class: 'wp-block-buttons' },
                wp.element.createElement('div', { class: 'wp-block-button' },
                    wp.element.createElement(
                        'button',
                        {
                            class: 'tipapp-action-button wp-block-button__link',
                            'data-api-base': props.attributes.api_base,
                        },
                        props.attributes.button_label)
                )
            )
    }
  })