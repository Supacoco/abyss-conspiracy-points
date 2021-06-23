<template>
  <div>
    <nav ref="navbar">
      <div>
        <lord-card
          v-for="(lord, index) in lordDeck.cards"
          :key="index"
          :lord="lord"
          @click.native="onLordClick(lord, index)"
        ></lord-card>
      </div>
      <div>
        <location-card
          v-for="(location, index) in locationDeck.cards"
          :key="index"
          :location="location"
          @click.native="onLocationClick(location, index)"
        >
        </location-card>
      </div>
      <div>
        <special-token-card
          v-for="(token, index) in specialTokenDeck.cards"
          :key="index"
          :token="token"
          @click.native="onSpecialTokenClick(token, index)"
        ></special-token-card>
      </div>
    </nav>
    <div>
      <player-board-view
        v-for="(playerBoard, index) in boards"
        :key="index"
        :player-board-id="index"
        :player-board="playerBoard"
        :is-active="playerBoard == activeBoard"
        @boardActivation="onBoardActivation"
      ></player-board-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
nav {
  overflow: hidden;
  background-color: #333;

  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.5s ease;
    animation: smoothScroll 1s forwards;
  }

  @keyframes smoothScroll {
    0% {
      transform: translateY(-142px);
    }

    100% {
      transform: translateY(0px);
    }
  }
}
</style>
<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import debounce from "lodash.debounce";

import { PlayerBoard, PlayerBoardView } from "../game-elements/player-board";
import { Lord, LordCard, LordDeck } from "../game-elements/lord";
import {
  Location,
  LocationCard,
  LocationDeck,
} from "../game-elements/location";
import {
  SpecialToken,
  SpecialTokenCard,
  SpecialTokenDeck,
} from "../game-elements/token";

@Component({
  components: {
    LordCard,
    LocationCard,
    SpecialTokenCard,
    PlayerBoardView,
  },
})
export default class Game extends Vue {
  @Ref("navbar")
  private navbar!: HTMLElement;

  private lordDeck = new LordDeck();
  private locationDeck = new LocationDeck();
  private specialTokenDeck = new SpecialTokenDeck();

  private boards: PlayerBoard[] = [];

  activeBoard: PlayerBoard | null = null;

  beforeMount(): void {
    const { playerCount } = this.$route.params;

    this.boards = Array(Number(playerCount))
      .fill(null)
      .map((_, index) => new PlayerBoard(`Player #${index + 1}`));

    this.activeBoard = this.boards[0];

    this.setupEventListener();
  }

  onLordClick(lord: Lord, index: number): void {
    try {
      this.activeBoard!.addLord(lord);
      this.lordDeck.removeCardAt(index);
    } catch (e) {
      //
    }
  }

  onLocationClick(location: Location, index: number): void {
    this.activeBoard!.addLocation(location);
    this.locationDeck.removeCardAt(index);
  }

  onSpecialTokenClick(token: SpecialToken, index: number): void {
    this.activeBoard!.addSpecialToken(token);
    this.specialTokenDeck.removeCardAt(index);
  }

  onBoardActivation(boardId: number): void {
    try {
      this.activeBoard = this.boards[boardId];
    } catch (e) {
      //
    }
  }

  setupEventListener(): void {
    const scrollListener = () => {
      if (window.pageYOffset > this.navbar.offsetTop) {
        this.navbar.classList.add("sticky");
      } else {
        this.navbar.classList.remove("sticky");
      }
    };

    window.onscroll = debounce(scrollListener, 200);
  }
}
</script>
