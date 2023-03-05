import React, { useCallback, useState } from "react";

export const getQueryStringValue = (
  key: string,
  queryString = window.location.search
): string | null => {
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
};

export const setQueryStringValue = (
  key: string,
  value: string,
  queryString = window.location.search
) => {
  const params = new URLSearchParams(queryString);
  params.set(key, value);

  if (!value) {
    params.delete(key);
  }

  window.history.pushState({}, "", `?${params.toString()}`);
};

function useQueryString(key: string, defaultValue = "") {
  const [value, setValue] = useState<any>(
    getQueryStringValue(key) || defaultValue
  );
  const onSetValue = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key]
  );

  return [value, onSetValue];
}

export default useQueryString;
