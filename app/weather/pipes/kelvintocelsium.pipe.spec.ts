import { KelvinToCelsiumPipe } from './kelvintocelsium.pipe';
import {} from 'jasmine';

describe('KelvinToCelsiumPipe', () => {
    let pipe: KelvinToCelsiumPipe;

    beforeEach(() => {
        pipe = new KelvinToCelsiumPipe();
    });

    it('transforms degrees', () => {
        let value: number = 1;

        expect(pipe.transform(value)).toBe(-272.1)
    });

});