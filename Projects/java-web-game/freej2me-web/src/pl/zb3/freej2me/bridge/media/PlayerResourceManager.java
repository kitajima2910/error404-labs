package pl.zb3.freej2me.bridge.media;

import java.util.*;

/*
 * this class is to make sure a player that is not playing can be GC'ed and
 * when it happens, the native player handle is released
 **/

public class PlayerResourceManager {
    private static final Set<Object> playingPlayers = new LinkedHashSet<>();

    public static void markPlayerPlaying(Object player) {
        // this is to ensure the player won't get GC'ed while playing
        playingPlayers.add(player);
    }

    public static void markPlayerNotPlaying(Object player) {
        playingPlayers.remove(player);
    }
}
