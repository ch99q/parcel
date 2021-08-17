// @flow
import {Optimizer} from '@parcel/plugin';
import {compile} from 'metro-hermes-compiler';
import {blobToString} from '@parcel/utils';

export default (new Optimizer({
  async optimize({options, contents, map}) {
    // return {contents};

    let code = await blobToString(contents);
    let mapString: string = await map?.stringify({
      // $FlowFixMe
      fs: options.inputFS,
      rootDir: options.projectRoot,
      inlineSources: true,
      format: 'string',
    });
    let bytecode = compile(code, {
      sourceURL: '',
      sourceMap: mapString,
    }).bytecode;

    return {
      contents: bytecode,
    };
  },
}): Optimizer);
