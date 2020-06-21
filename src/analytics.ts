import * as $ from 'jquery'

const ff = '';

function createAnalytics(): object {

    let counter: number = 0;
    let destroyed: boolean = false;

    const listener = () => ++counter;

    $(document).on('click', listener);

    return {
        destroy() {
            $(document).off('click', listener);
            destroyed = true;
        },

        getClicks() {
            if(destroyed) {
                return `Analytics is destroyed. Total clicks = ${counter}`
            }
            return counter;
        }
    }
}

window['analytics'] = createAnalytics();
