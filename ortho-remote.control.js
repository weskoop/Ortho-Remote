/**
 * TE Ortho Remote - Last "Clicked" (aka Hovered) Param for Bitwig.
 * by slow wild
 * 
 * Turn to adjust, Click to toggle control lock!
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
loadAPI(20);

host.defineController("TE", "Ortho Remote", "1.0", "dca5da05-f30f-4b97-bcdf-02f86b30de77", "slow wild");
host.defineMidiPorts(1, 0);
host.addDeviceNameBasedDiscoveryPair(["ortho Bluetooth"], []);
host.addDeviceNameBasedDiscoveryPair(["ortho blue Bluetooth"], []);
host.addDeviceNameBasedDiscoveryPair(["ortho white Bluetooth"], []);
host.addDeviceNameBasedDiscoveryPair(["ortho yellow Bluetooth"], []);
host.addDeviceNameBasedDiscoveryPair(["ortho red Bluetooth"], []);

function init() {
  host.getMidiInPort(0).setMidiCallback(onMidi);
  lcp = host.createLastClickedParameter("Ortho", "Ortho Remote");
  lcp.parameter().setIndication(true);
}

function onMidi(status, data1, data2) {
  if (MIDIChannel(status) != 0) return;

  // Inc/Dec.
  if (isChannelController(status) && data1 == 1) {
    if (data2 == 1) lcp.parameter().inc(1, 127);
    if (data2 == 127) lcp.parameter().inc(-1, 127);
  }

  // Smart Lock on click.
  if (isNoteOn(status)) lcp.smartToggleLock();
}

