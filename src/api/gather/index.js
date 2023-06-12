import { otherHttp } from "http/request";
import md5 from "md5";
import settings, { GatherDefault } from "@/settings/index";
import Cache from "@/utils/cache";
import { CACHE_GATHER_KEY } from "@/settings";
export const gather = (_params = {}) => {
  const data = Object.assign(
    {},
    GatherDefault,
    _params,
    Cache.get(CACHE_GATHER_KEY, {}),
    {
      log_time: String(Math.floor(Date.now() / 1000)),
    }
  );
  for (var key in data) {
    data[key] += "";
  }
  const _data = { body: JSON.stringify(data) };
  const Sign = md5(JSON.stringify(_data) + settings.GATHER_KEY);
  return otherHttp.post("/gather/superstar?sign=" + Sign, _data);
};
