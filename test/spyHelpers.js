export const fetchResponseOk = body =>
    //mimic a fetch response
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(body)
    })
export const fetchResponseError = () =>
    //mimic a ok:false response
    Promise.resolve({ ok: false });

export const fetchRequestBody = (fetchSpy) => JSON.parse(fetchSpy.mock.calls[0][1].body)     