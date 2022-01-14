import Contents from '../contents';

/* Typings */
import { InteractionReplyOptions } from 'discord.js';
import { ApplicationInteraction, Permissions } from 'src/structures/typings';

/**
 * ! ARRAY FUNCTIONS
 */

/**
 * ? Randomize an array
 * @param array
 * @returns
 */
export function arrayShuffle<E>(array: E[]): E[] {
  if (!Array.isArray(array)) throw TypeError('array must be an array');
  return [...array].sort(() => Math.random() - 0.5);
}

/**
 * ? Separe true and false values
 * @param array
 * @param filter
 * @returns
 * @example
 * const array = [0, 4, 7, 6, 78, 120]
 * const filter = (number) => number > 10
 *
 * Util.partition(array, filter) // [[78, 120], [0, 4, 7, 6]]
 */
export function partition<E>(array: E[], filter: (element: E, index: number, array: E[]) => unknown): [E[], E[]] {
  if (!Array.isArray(array)) throw TypeError('array must be an array');
  if (typeof filter !== 'function') throw TypeError('filter must be a function');
  const [a, b] = <[E[], E[]]>[[], []];

  for (let i = 0, l = array.length; i < l; i++) {
    const element = array[i];
    filter(element, i, array) ? a.push(element) : b.push(element);
  }

  return [a, b];
}

/**
 * ! NUMBER FUNCTIONS
 */

/**
 * Convert a number to superbe string
 * @param { number } value
 * @returns { string }
 */
export function numberForm(value: number): string {
  if (typeof value !== 'number') throw TypeError('num must be a number');
  const array = ['y', 'z', 'e', 'p', 't', 'g', 'm', 'k'];

  for (let i = 24, y = 0; i > 0; i -= 3) {
    if (value >= 10 ** i) {
      if ((value / 10 ** i).toFixed(1).toString().includes('.0')) return (value / 10 ** i).toFixed(0);
      else return (value / 10 ** i).toFixed(1) + array[y];
    } else y++;
  }

  return value.toString();
}

/**
 * ! STRING FUNCTIONS
 */

/**
 * ? Split a string by espace
 * @param { string } str
 * @returns { string[] }
 * @example
 * Util.toArgs('I love   ferret') // ['I', 'love', 'ferret']
 */
export function toArgs(str: string): string[] {
  return str.split(/\s+/);
}

export function toWords(str: string): string[] {
  if (typeof str !== 'string') throw TypeError('str must be a string');

  return (
    str.match(
      /[a-zA-Z\-\u00c0-\u00c4\u00c7-\u00cf\u00d1-\u00d6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd]+/g
    ) || []
  );
}

/**
 * ? Create progress bar with string
 * @param { number } value
 * @param { number } total
 * @param { number } size
 * @param { string } full
 * @param { string } empty
 * @returns { string }
 * @example
 * stringProgressBar(30, 100) // ###-------
 */
export function stringProgressBar(value: number, total: number, size = 10, full = '⬢', empty = '⬡'): string {
  const pourcent = Math.ceil((value / total) * size);
  return ''.padStart(pourcent, full).padEnd(size, empty);
}

/**
 * ! PRIVATE FUNCTIONS
 */

/**
 * ? Check if member and client have permissions to use interactions
 * @async
 * @param { ApplicationInteraction } interaction
 * @param { Permissions } permissions
 * @returns { { check: boolean, message: InteractionReplyOptions | null } }
 */
export async function hasPermissions(
  interaction: ApplicationInteraction,
  permissions: Permissions
): Promise<{ check: boolean; content: InteractionReplyOptions | null }> {
  if (!interaction.guild) return { check: false, content: null };

  const client = interaction.client;

  /**
   * Ajouter l'immunité de certains rôles, de certains users, certaines guildes et de certains channels
   * Ajouter les messages d'erreurs customisable
   */

  //? Client permissions
  if (permissions.client && interaction.guild.me) {
    const missingPermissions = interaction.guild.me.permissions.missing(permissions.client);
    if (missingPermissions.length) {
      const result = { check: false, content: Contents.MISSING_CLIENT_PERMISSIONS(client, missingPermissions) };
      return result;
    }
  } //? [end] Client permissions

  //? Member permissions
  if (permissions.user) {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const missingPermissions = member.permissions.missing(permissions.user);
    if (member && missingPermissions.length) {
      const result = { check: false, content: Contents.MISSING_MEMBER_PERMISSIONS(member, missingPermissions) };
      return result;
    }
  } //? [end] Member permissions

  return { check: true, content: null };
} //? [end] unction for permissions check in a interaction
