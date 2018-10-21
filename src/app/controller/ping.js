// @flow
'use strict'

export const Get = (req: Object, res: Object) => {
  return res.status(200).json({
    status: 'success'
  });
};

