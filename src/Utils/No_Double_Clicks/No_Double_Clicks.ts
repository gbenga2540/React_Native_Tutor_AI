import { debounce } from 'lodash';
import { global_variables } from '../../Configs/Global/Global_Variable';

export const no_double_clicks = ({
    execFunc,
    debounceTime,
}: {
    execFunc: () => void;
    debounceTime?: number;
}) =>
    debounce(execFunc, debounceTime || global_variables.debounceTime, {
        leading: true,
        trailing: false,
    });
