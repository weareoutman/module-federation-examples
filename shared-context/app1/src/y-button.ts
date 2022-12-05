import { createDecorators } from './decorators/createDecorators';
import { XButton } from './x-button';

const { defineElement, property } = createDecorators();

@defineElement("y-button")
class YButton extends XButton {
    @property()
    test3: string;
}
