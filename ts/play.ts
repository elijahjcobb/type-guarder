/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OObjectType, OStandardType} from "./index";

OStandardType.string.verify(3);
OStandardType.number.verify(3);
OObjectType.follow({
	x: OStandardType.string,
	y: OStandardType.number
}).verify(43);