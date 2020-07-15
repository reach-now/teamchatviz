/*
  #teamchatviz
  Copyright (C) 2016 Moovel Group GmbH, Haupstaetter str. 149, 70188, Stuttgart, Germany hallo@moovel.com

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301
  USA
*/

import db from '../../../db';
import toModel from './mappers/toModel';
import getOne from './getOne';

export default async(user) => {
  const member = await db.one('SELECT * FROM members WHERE team_id = $(team_id) LIMIT 1', {
    team_id: user.teamId,
  });
  await db.none('UPDATE users SET id = $(new_id) WHERE id = $(old_id)', {
    new_id: member.id,
    old_id: user.id,
  });
  return await getOne(member.id);
};