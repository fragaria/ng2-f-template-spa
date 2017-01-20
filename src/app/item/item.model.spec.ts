import { Item } from './index';

describe('Item', () => {
    function createItem() {
        let user: Item = {id: 1, title: 'titleValue'};
        return user;
    }

    it('has id', () => {
        expect(createItem().id).toEqual(1);
    });
    it('has title', () => {
        expect(createItem().title).toEqual('titleValue');
    });
});
