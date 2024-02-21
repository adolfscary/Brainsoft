import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "@prisma/client";
import { zodToOpenAPI } from "nestjs-zod";
import { CurrentUser } from "../auth/auth.decorators.js";
import { AuthGuard } from "../auth/auth.guard.js";
import {
  PageInfoEntity,
  paginateEntity,
} from "../common/entity/page-info.entity.js";
import { AppEntityNotFound } from "../common/error.js";
import {
  FindByExternalIdPokemonParamDto,
  findByExternalIdPokemonParamSchema,
} from "./dto/find-by-external-id-pokemon.dto.js";
import {
  FindByIdPokemonParamDto,
  findByIdPokemonParamSchema,
} from "./dto/find-by-id-pokemon.dto.js";
import {
  FindByNamePokemonParamDto,
  findByNamePokemonParamSchema,
} from "./dto/find-by-name-pokemon.dto.js";
import {
  PaginatePokemonsQueryDto,
  paginatePokemonsQuerySchema,
} from "./dto/paginate-pokemons.dto.js";
import {
  UpdateFavoritePokemonBodyDto,
  UpdateFavoritePokemonParamDto,
  updateFavoritePokemonBodySchema,
  updateFavoritePokemonParamSchema,
} from "./dto/update-favorite-pokemon.dto.js";
import { PokemonTypesEntity } from "./entity/pokemon-types.entity.js";
import { PokemonEntity } from "./entity/pokemon.entity.js";
import { PokemonService } from "./pokemon.service.js";

@ApiTags("pokemons")
@Controller("pokemons")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiQuery({
    name: "filter[type]",
    schema: zodToOpenAPI(paginatePokemonsQuerySchema.shape["filter[type]"]),
    required: false,
  })
  @ApiQuery({
    name: "filter[favorite]",
    schema: zodToOpenAPI(paginatePokemonsQuerySchema.shape["filter[favorite]"]),
    required: false,
  })
  @ApiQuery({
    name: "search[name]",
    schema: zodToOpenAPI(paginatePokemonsQuerySchema.shape["search[name]"]),
    required: false,
  })
  @ApiQuery({
    name: "limit",
    schema: zodToOpenAPI(paginatePokemonsQuerySchema.shape.limit),
    required: false,
  })
  @ApiQuery({
    name: "page",
    schema: zodToOpenAPI(paginatePokemonsQuerySchema.shape.page),
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "OK",
    type: paginateEntity(PokemonEntity),
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async paginate(
    @Query() query: PaginatePokemonsQueryDto,
    @CurrentUser() currentUser: User,
  ): Promise<{
    data: PokemonEntity[];
    pageInfo: PageInfoEntity;
  }> {
    const { data, pageInfo } = await this.pokemonService.paginate({
      ...query,
      currentUser,
    });
    return {
      data: data.map(this.pokemonService.toPokemonEntity),
      pageInfo,
    };
  }

  @UseGuards(AuthGuard)
  @Get("name/:name")
  @ApiBearerAuth()
  @ApiParam({
    name: "name",
    schema: zodToOpenAPI(findByNamePokemonParamSchema.shape.name),
  })
  @ApiResponse({
    status: 200,
    description: "OK",
    type: PokemonEntity,
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
  })
  async findByName(
    @Param() { name }: FindByNamePokemonParamDto,
  ): Promise<PokemonEntity> {
    const pokemon = await this.pokemonService.findByName(name);
    if (!pokemon) {
      throw new AppEntityNotFound({
        entity: "Pokemon",
        key: "name",
        value: name,
      });
    }
    return this.pokemonService.toPokemonEntity(pokemon);
  }

  @UseGuards(AuthGuard)
  @Get("external-id/:externalId")
  @ApiBearerAuth()
  @ApiParam({
    name: "externalId",
    schema: zodToOpenAPI(findByExternalIdPokemonParamSchema.shape.externalId),
  })
  @ApiResponse({
    status: 200,
    description: "OK",
    type: PokemonEntity,
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
  })
  async findByExternalId(
    @Param() { externalId }: FindByExternalIdPokemonParamDto,
  ): Promise<PokemonEntity> {
    const pokemon = await this.pokemonService.findByExternalId(externalId);
    if (!pokemon) {
      throw new AppEntityNotFound({
        entity: "Pokemon",
        key: "externalId",
        value: externalId,
      });
    }
    return this.pokemonService.toPokemonEntity(pokemon);
  }

  @UseGuards(AuthGuard)
  @Get("types")
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "OK",
    type: PokemonTypesEntity,
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
  })
  async types(): Promise<PokemonTypesEntity> {
    const pokemonTypes = await this.pokemonService.types();
    return {
      data: pokemonTypes.map(({ name }) => name),
    };
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    schema: zodToOpenAPI(findByIdPokemonParamSchema.shape.id),
  })
  @ApiResponse({
    status: 200,
    description: "OK",
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
  })
  async findById(
    @Param() { id }: FindByIdPokemonParamDto,
  ): Promise<PokemonEntity> {
    const pokemon = await this.pokemonService.findById(id);
    if (!pokemon) {
      throw new AppEntityNotFound({
        entity: "Pokemon",
        key: "id",
        value: id,
      });
    }
    return this.pokemonService.toPokemonEntity(pokemon);
  }

  @UseGuards(AuthGuard)
  @Patch(":id/update-favorite")
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    schema: zodToOpenAPI(updateFavoritePokemonParamSchema.shape.id),
  })
  @ApiBody({
    schema: zodToOpenAPI(updateFavoritePokemonBodySchema),
  })
  @ApiResponse({
    status: 204,
    description: "OK",
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
  })
  async updateFavorite(
    @Param() { id }: UpdateFavoritePokemonParamDto,
    @Body() body: UpdateFavoritePokemonBodyDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    const pokemon = await this.pokemonService.findById(id);
    if (!pokemon) {
      throw new AppEntityNotFound({
        entity: "Pokemon",
        key: "id",
        value: id,
      });
    }
    if (body.favorite) {
      await this.pokemonService.addFavorite({
        userId: currentUser.id,
        pokemonId: id,
      });
      return;
    }
    await this.pokemonService.removeFavorite({
      userId: currentUser.id,
      pokemonId: id,
    });
  }
}
